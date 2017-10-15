This builds a portable Linux ChakraCore binary. It should work on pretty much every x86_64 Linux distro.

I tested this on an Ubuntu 14.04 x86_64 system. This script builds this release: https://github.com/Microsoft/ChakraCore/releases/tag/v1.7.1

It builds inside a CentOS6 proot (which is like a chroot, but proot allows you do do this without needing root)

For ICU support we download the source tarball from here https://packages.ubuntu.com/zesty/libicu57 (this is because the official ICU 57.1 source tarball isn't signed, later versions are).

You need talloc in order to build
```
sudo apt-get install libtalloc-dev
```
## Usage

Run the following script to fetch dependencies and check signatures/checksums. Look out for and act on errors (especically signature ones). Note that this script doesn't currently return error codes so you will need to check errors by eye
```
./download-and-check-required
```

Next set up the build environment:
```
./setup-build-environment
```
This will take a long while since it will build CMake 3.5.2 and Clang 3.8 (required to build ChakraCore).

Now extract the ChakraCore source and move it into the centos root filesystem:
```
./09-extract-chakracore-source
```
You are now finally ready to build ChakraCore:
```
./10-build-chakracore
```

In theory this should be it. You should now have a libChakraCore.so shared library inside `centos6-root` 

## Troubleshooting

If you do see any errors about clock_gettime you may need to apply the workaround below

Here comes the fiddly bit. The ChakraCore build will run almost to the end. It will then fail complaining about clock_gettime. This is because the CMake files are not telling the compiler to link to librt.

First enter the proot and set up your environment (paste the following commands in to your terminal):
```
./enter-proot 
export USER=root
export HOME=/root
source /etc/profile
cd /root
export PATH=/opt/cmake-3.5.2/bin:$PATH
export PATH=/opt/clang3.8/bin:$PATH
cd src/ChakraCore-1.7.1/
```
Now jump in to out/Release and run the following:
```
make VERBOSE=1 -f Makefile
```
When this errors out run ``pushd .`` copy the command line of the failing command, paste it in to the terminal and append ``-lrt`` . The command should then succeed. Now run ``popd`` . Then rinse and repeat until make manages to get to the end.

If you do all that should should have a ``ch`` binary and a ``libChakraCore.so`` that will run on any x86_64 distro from GLIBC_2.12 up (possibly lower too).

This builds a protable Linux ChakraCore binary. It should work on pretty much every x86_64 Linux distro.

It builds inside a CentOS6 proot (which is like a chroot, but proot allows you do do this without needing root)

You need talloc in order to build
sudo apt-get install libtalloc-dev

## Usage

Run the following script to fetch dependencies and check signatures/checksums. Look out for and act on errors (especically signature ones). Note that this script doesn't currently return error codes so you will need to check errors by eye
```
./download-and-check-required
```

Next set up the built environment:
```
./setup-build-environment
```
This will take a long while since it will build CMake 3.5.2 and Clang 3.8 (required to build ChakraCore).

Now extract the ChakraCore source and move it into the centos root filesystem:
```
09-extract-chakracore-source
```
You are now finally ready to build ChakraCore:
```
./10-build-chakracore
```

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
cd src/ChakraCore-1.7.0/
```
Now jump in to out/Release and run the following:
```
make VERBOSE=1 -f Makefile
```
When this errors out run ``pushd .`` copy the command line of the failing command, paste it in to the terminal and append ``-lrt`` . The command should the succeed. Then rinse and repeat until make manages to get to the end.

If you do all that should should have a ``ch`` binary and a ``libChakraCore.so`` that will run on any x86_64 distro from GLIBC_2.12 up (possibly lower too).

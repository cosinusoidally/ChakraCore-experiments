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

# ChakraCore-experiments
This is a dumping ground for code I have written to experiment with ChakraCore.

not a lot here at the moment:
* Code in the centos6 directory that allows you to patch the official binaries to run on CentOS 6 (the official binaries need at least GLIBC 2.17)
* Code in the build-chakracore directory allows you to generate a portable Linux ChakraCore binary that should work on most x86_64 distros . This binary is built inside a CentOS 6 proot (like a chroot, but creating one doesn't need root) 

Microsoft distributes ChakraCore binaries here: https://github.com/Microsoft/ChakraCore/releases . Unfortunately those binaries do not work on CentOS 6 systems since they depend on symbols from GLIBC 2.14 and GLIBC2.17 . In this directory there is a utility to get and patch the binaries in order to allow them to work on CentOS 6 (``./get_and_patch_chakracore``). More generally this utility should be able to allow the official Linux ChakraCore binaries to run on pretty much any x86_64 based Linux distro (the earliest one I have tested is Debian Squeeze).

## Usage

You need to have node.js in your PATH. Then run:

```
./get_and_patch_chakracore
```

This will fetch and patch the official Linux binaries (both ``ch`` and ``libChakraCore.so``).

To test run:
```
./test_ch
./test_lib
```

``test_ch`` should display a ASCII art Mandelbrot set

``test_lib`` should compile and run a simple "Hello World" C embedding example.

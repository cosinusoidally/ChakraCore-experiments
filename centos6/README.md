Microsoft distributes ChakraCore binaries here: https://github.com/Microsoft/ChakraCore/releases . Unfortunately those binaries do not work on CentOS 6 systems since they depend on symbols from GLIBC 2.14 and GLIBC 2.17 . In this directory there is a utility to get and patch the binaries in order to allow them to work on CentOS 6 (``./get_and_patch_chakracore``). More generally this utility should be able to allow the official Linux ChakraCore binaries to run on pretty much any x86_64 based Linux distro (the earliest one I have tested is Debian Squeeze).

## Usage

You need to have node.js in your PATH (I used 4.8.3, but that doesn't matter since the scripts are so trivial). Then run:

```
./get_and_patch_chakracore
```

This will fetch and patch the official Linux binaries (both ``ch`` and ``libChakraCore.so``). This script also checks the sha256sum of the release tarball to verify its integrity. Once this script has run the patched version of ChakraCore should exist in the directory ``./ChakraCoreFiles`` (note that the tarball ``cc_linux_x64_1_7_0.tar.gz`` is the unpatched original)

To test run:
```
./test_ch
./test_lib
```

``test_ch`` should display an ASCII art Mandelbrot set

``test_lib`` should compile and run a simple "Hello World" C embedding example (you will need GCC if you want to build this)

## Caveats

The patched binaries require that librt is ``LD_PRELOAD``ed (see ``test_ch`` and ``test_lib``). You must provide the correct path to librt for your system. When compiling code that embeds ``libChakraCore.so`` you must also use ``-lrt`` . This is because the ``clock_gettime`` symbol in the original binary was the version from GLIBC 2.17 (see https://blog.flameeyes.eu/2012/12/glibc-2-17-what-s-going-to-be-a-trouble/ for more details).

## How it works

The ``patch_ch.js`` and  ``patch_lib.js`` tweak symbols in ``ch`` and ``libChakraCore.so`` respectively. They patch symbols for ``memcpy`` and ``clock_gettime`` to use the versions from GLIBC 2.2.5. They also weaken the GLIBC 2.14 and 2.17 symbols in those binaries. This amounts to a 4 byte patch to each ``patch_ch.js`` and ``patch_lib.js``. The method used is based on the one described here: http://www.lightofdawn.org/wiki/wiki.cgi/NewAppsOnOldGlibc . The method I used avoided the need to implement shim functions (I just apply a simple binary patch).

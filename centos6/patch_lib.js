fs=require("fs");
a=fs.readFileSync("ChakraCoreFiles/lib/libChakraCore.so");

// all the values below were found using readelf -V libChakraCore.so

// o1 is the file offset for '.gnu.version' section
o1=0x004d22;
// o2 is the file offset for '.gnu.version_r' section
o2=0x0050d8;

// mo1 is the offset of memcpy in '.gnu.version'
mo1=o1+2*0xc;
// set to version 2 (meaning use GLIBC_2.2.5 version)
a[mo1]=2;

// mo2 is the offset of clock_gettime in '.gnu.version'
mo2=o1+2*0x4d;
// set to version 2 (meaning use GLIBC_2.2.5 version)
a[mo2]=2;

// We also need to make the GLIBC_2.14 and GLIBC_2.17 entries in
// '.gnu.version_r' to be weak

// to1 is the offset of the GLiBC_2.14 vna_flags field in '.gnu.version_r'
to1=o2+0x0140+4;
// 2 mean make it weak
a[to1]=2;
// to2 is the offset of the GLIBC_2.17 vna_flags field in '.gnu.version_r'
to2=o2+0x00f0+4;
// 2 mean make it weak
a[to2]=2;

fs.writeFileSync("ChakraCoreFiles/lib/libChakraCore.so",a);

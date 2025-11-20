get_filename_component(_opencv3_ocl_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_opencv3_ocl_root "${_opencv3_ocl_root}/../../..")
get_filename_component(_opencv3_ocl_root "${_opencv3_ocl_root}" ABSOLUTE)

set(OPENCV3_OCL_LIBRARIES
  ${_opencv3_ocl_root}/lib/libopencv_ocl.so
  ${_opencv3_ocl_root}/lib/libopencv_ocl.so.2.4
  CACHE INTERNAL "" FORCE
)

set(OPENCV3_OCL_INCLUDE_DIRS
  ${_opencv3_ocl_root}/include/
  CACHE INTERNAL "" FORCE
)

qi_persistent_set(OPENCV3_OCL_DEPENDS OPENCV3_ML OPENCV3_IMGPROC OPENCV3_CORE OPENCV3_OBJDETECT ZLIB PNG OPENCV3_HIGHGUI)
export_lib(OPENCV3_OCL)

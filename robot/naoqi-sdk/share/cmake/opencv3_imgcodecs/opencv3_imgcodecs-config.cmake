get_filename_component(_opencv3_imgcodecs_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_opencv3_imgcodecs_root "${_opencv3_imgcodecs_root}/../../..")
get_filename_component(_opencv3_imgcodecs_root "${_opencv3_imgcodecs_root}" ABSOLUTE)

set(OPENCV3_IMGCODECS_LIBRARIES
  ${_opencv3_imgcodecs_root}/lib/libopencv_imgcodecs.so
  CACHE INTERNAL "" FORCE
)

set(OPENCV3_IMGCODECS_INCLUDE_DIRS
  ${_opencv3_imgcodecs_root}/include/
  CACHE INTERNAL "" FORCE
)

qi_persistent_set(OPENCV3_IMGCODECS_DEPENDS OPENCV3_CORE OPENCV3_IMGPROC ZLIB)

export_lib(OPENCV3_IMGCODECS)

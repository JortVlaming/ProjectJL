get_filename_component(_opencv3_imgproc_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_opencv3_imgproc_root "${_opencv3_imgproc_root}/../../..")
get_filename_component(_opencv3_imgproc_root "${_opencv3_imgproc_root}" ABSOLUTE)

set(OPENCV3_IMGPROC_LIBRARIES
  ${_opencv3_imgproc_root}/lib/libopencv_imgproc.so
  CACHE INTERNAL "" FORCE
)

set(OPENCV3_IMGPROC_INCLUDE_DIRS
  ${_opencv3_imgproc_root}/include/
  CACHE INTERNAL "" FORCE
)

qi_persistent_set(OPENCV3_IMGPROC_DEPENDS OPENCV3_CORE)
export_lib(OPENCV3_IMGPROC)

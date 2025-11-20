get_filename_component(_opencv3_flann_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_opencv3_flann_root "${_opencv3_flann_root}/../../..")
get_filename_component(_opencv3_flann_root "${_opencv3_flann_root}" ABSOLUTE)

set(OPENCV3_FLANN_LIBRARIES
  ${_opencv3_flann_root}/lib/libopencv_flann.so
  CACHE INTERNAL "" FORCE
)

set(OPENCV3_FLANN_INCLUDE_DIRS
  ${_opencv3_flann_root}/include/
  CACHE INTERNAL "" FORCE
)

qi_persistent_set(OPENCV3_FLANN_DEPENDS OPENCV3_CORE)
export_lib(OPENCV3_FLANN)

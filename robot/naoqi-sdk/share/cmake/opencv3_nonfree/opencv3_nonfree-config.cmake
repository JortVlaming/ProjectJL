get_filename_component(_opencv3_nonfree_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_opencv3_nonfree_root "${_opencv3_nonfree_root}/../../..")
get_filename_component(_opencv3_nonfree_root "${_opencv3_nonfree_root}" ABSOLUTE)

set(OPENCV3_NONFREE_LIBRARIES
  ${_opencv3_nonfree_root}/lib/libopencv_nonfree.so
  CACHE INTERNAL "" FORCE
)

set(OPENCV3_NONFREE_INCLUDE_DIRS
  ${_opencv3_nonfree_root}/include/
  CACHE INTERNAL "" FORCE
)

qi_persistent_set(OPENCV3_NONFREE_DEPENDS OPENCV3_CORE OPENCV3_IMGPROC OPENCV3_FEATURES2D OPENCV3_FLANN OPENCV3_OCL)

export_lib(OPENCV3_NONFREE)

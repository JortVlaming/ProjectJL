get_filename_component(_opencv3_calib3d_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_opencv3_calib3d_root "${_opencv3_calib3d_root}/../../..")
get_filename_component(_opencv3_calib3d_root "${_opencv3_calib3d_root}" ABSOLUTE)

set(OPENCV3_CALIB3D_LIBRARIES
  ${_opencv3_calib3d_root}/lib/libopencv_calib3d.so
  CACHE INTERNAL "" FORCE
)

set(OPENCV3_CALIB3D_INCLUDE_DIRS
  ${_opencv3_calib3d_root}/include/
  CACHE INTERNAL "" FORCE
)

qi_persistent_set(OPENCV3_CALIB3D_DEPENDS OPENCV3_CORE OPENCV3_FEATURES2D)
export_lib(OPENCV3_CALIB3D)

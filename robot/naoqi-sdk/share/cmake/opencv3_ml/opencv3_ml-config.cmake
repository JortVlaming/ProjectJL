get_filename_component(_opencv3_ml_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_opencv3_ml_root "${_opencv3_ml_root}/../../..")
get_filename_component(_opencv3_ml_root "${_opencv3_ml_root}" ABSOLUTE)

set(OPENCV3_ML_LIBRARIES
  ${_opencv3_ml_root}/lib/libopencv_ml.so
  CACHE INTERNAL "" FORCE
)

set(OPENCV3_ML_INCLUDE_DIRS
  ${_opencv3_ml_root}/include/
  CACHE INTERNAL "" FORCE
)

qi_persistent_set(OPENCV3_ML_DEPENDS OPENCV3_CORE)

export_lib(OPENCV3_ML)

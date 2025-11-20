get_filename_component(_opencv3_objdetect_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_opencv3_objdetect_root "${_opencv3_objdetect_root}/../../..")
get_filename_component(_opencv3_objdetect_root "${_opencv3_objdetect_root}" ABSOLUTE)

set(OPENCV3_OBJDETECT_LIBRARIES
  ${_opencv3_objdetect_root}/lib/libopencv_objdetect.so
  CACHE INTERNAL "" FORCE
)

set(OPENCV3_OBJDETECT_INCLUDE_DIRS
  ${_opencv3_objdetect_root}/include/
  CACHE INTERNAL "" FORCE
)

qi_persistent_set(OPENCV3_OBJDETECT_DEPENDS OPENCV3_CORE OPENCV3_FEATURES2D)
export_lib(OPENCV3_OBJDETECT)

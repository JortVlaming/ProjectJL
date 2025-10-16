get_filename_component(_opencv3_core_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_opencv3_core_root "${_opencv3_core_root}/../../..")
get_filename_component(_opencv3_core_root "${_opencv3_core_root}" ABSOLUTE)

set(OPENCV3_CORE_LIBRARIES
  ${_opencv3_core_root}/lib/libopencv_core.so
  CACHE INTERNAL "" FORCE
)

set(OPENCV3_CORE_INCLUDE_DIRS
  ${_opencv3_core_root}/include/
  CACHE INTERNAL "" FORCE
)

qi_persistent_set(OPENCV3_CORE_DEPENDS ZLIB)
export_lib(OPENCV3_CORE)

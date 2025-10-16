get_filename_component(_opencv3_videoio_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_opencv3_videoio_root "${_opencv3_videoio_root}/../../..")
get_filename_component(_opencv3_videoio_root "${_opencv3_videoio_root}" ABSOLUTE)

set(OPENCV3_VIDEOIO_LIBRARIES
  ${_opencv3_videoio_root}/lib/libopencv_videoio.so
  CACHE INTERNAL "" FORCE
)

set(OPENCV3_VIDEOIO_INCLUDE_DIRS
  ${_opencv3_videoio_root}/include/
  CACHE INTERNAL "" FORCE
)

qi_persistent_set(OPENCV3_VIDEOIO_DEPENDS OPENCV3_CORE OPENCV3_IMGPROC)

export_lib(OPENCV3_VIDEOIO)

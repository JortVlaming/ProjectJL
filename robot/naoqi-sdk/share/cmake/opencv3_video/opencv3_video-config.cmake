get_filename_component(_opencv3_video_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_opencv3_video_root "${_opencv3_video_root}/../../..")
get_filename_component(_opencv3_video_root "${_opencv3_video_root}" ABSOLUTE)

set(OPENCV3_VIDEO_LIBRARIES
  ${_opencv3_video_root}/lib/libopencv_video.so
  CACHE INTERNAL "" FORCE
)

set(OPENCV3_VIDEO_INCLUDE_DIRS
  ${_opencv3_video_root}/include
  CACHE INTERNAL "" FORCE
)

export_lib(OPENCV3_VIDEO)

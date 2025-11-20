get_filename_component(_opencv3_highgui_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_opencv3_highgui_root "${_opencv3_highgui_root}/../../..")
get_filename_component(_opencv3_highgui_root "${_opencv3_highgui_root}" ABSOLUTE)

set(OPENCV3_HIGHGUI_LIBRARIES
  ${_opencv3_highgui_root}/lib/libopencv_highgui.so
  CACHE INTERNAL "" FORCE
)

set(OPENCV3_HIGHGUI_INCLUDE_DIRS
  ${_opencv3_highgui_root}/include/
  CACHE INTERNAL "" FORCE
)

qi_persistent_set(OPENCV3_HIGHGUI_DEPENDS OPENCV3_CORE OPENCV3_IMGPROC)

export_lib(OPENCV3_HIGHGUI)

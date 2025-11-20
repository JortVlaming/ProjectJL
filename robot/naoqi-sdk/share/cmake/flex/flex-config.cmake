get_filename_component(_flex_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_flex_root "${_flex_root}/../../..")
get_filename_component(_flex_root "${_flex_root}" ABSOLUTE)

set(
  FLEX_EXECUTABLE
  "${_flex_root}/bin/flex"
  CACHE INTERNAL "" FORCE
)

export_bin(FLEX)


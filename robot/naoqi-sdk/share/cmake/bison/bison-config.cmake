get_filename_component(_bison_root "${CMAKE_CURRENT_LIST_FILE}" PATH)
set(_bison_root "${_bison_root}/../../..")
get_filename_component(_bison_root "${_bison_root}" ABSOLUTE)

set(
  BISON_EXECUTABLE
  "${_bison_root}/bin/bison"
  CACHE INTERNAL "" FORCE
)

export_bin(BISON)


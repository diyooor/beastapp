cmake_minimum_required(VERSION 3.10)
project(beastapp)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Include directories
include_directories(include)

# Source files
set(SRC_DIR src)
set(COMMON_SRC ${SRC_DIR}/common)
set(HTTP_SRC ${SRC_DIR}/http)
set(WS_SRC ${SRC_DIR}/ws)

set(SOURCES
    ${COMMON_SRC}/shared_state.cpp
    ${HTTP_SRC}/http_session.cpp
    ${HTTP_SRC}/listener.cpp
    ${WS_SRC}/websocket_session.cpp
    ${SRC_DIR}/main.cpp
)

# Add executable
add_executable(${PROJECT_NAME} ${SOURCES})

# Link Boost libraries
find_package(Boost 1.85 REQUIRED COMPONENTS system thread filesystem date_time)
if(Boost_FOUND)
    target_include_directories(${PROJECT_NAME} PUBLIC ${Boost_INCLUDE_DIRS})
    target_link_libraries(${PROJECT_NAME} PUBLIC ${Boost_LIBRARIES})
endif()

# Add pthread
find_package(Threads REQUIRED)
target_link_libraries(${PROJECT_NAME} PRIVATE Threads::Threads)


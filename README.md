# warsucks
WARSUCKS- WAR Sucks Universal Conflict Kinetics Simulator

Actually dynamics, not just kinetics. But Kinetics sounded cooler.

## Build and Run
### Build Sim Server (Docker container)

    cd servesim
    build -t servesim .

### Run Sim Server

    docker run -it servesim


## Roadmap:
- create simulator program
- package simulator in docker container
- create viewer program
  - start with WebGL
- Newtonian Dynamics / Classical Mechanics
  - Fire a firearm at a target within 1km
    - Initially with no air resistance, with constant gravity, in an inertial frame
    - Add coriolis effect due to rotating frame of the Earth
    - Add support for pluggagble air-resistance models
    - Add suport for pluggable wind models
  - Grenades and explosives
    - pluggable fragmentation model
  - Artillery
  - Airstrikes
  - etc.
- Orbital Mechanics
  - Estimate when relativistic effects are significant
  - Special-Relativistic reference frames
- ...
- simulation of ground engagement
- simulation of ground/air engagments
- simulation of space engagements

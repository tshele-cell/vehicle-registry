// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VehicleRegistry {
    
    struct Vehicle {
        string vin;
        string plate;
        string owner;
        string status;
        uint256 timestamp;
    }

    // Mapping from License Plate to Vehicle details
    mapping(string => Vehicle) public vehicles;
    
    // Event to log registration on the blockchain
    event VehicleRegistered(string plate, string owner, uint256 timestamp);

    // Function to register a vehicle
    function registerVehicle(
        string memory _vin, 
        string memory _plate, 
        string memory _owner, 
        string memory _make
    ) public {
        vehicles[_plate] = Vehicle(_vin, _plate, _owner, "Active", block.timestamp);
        emit VehicleRegistered(_plate, _owner, block.timestamp);
    }

    // Function to update status (e.g., Stolen)
    function updateStatus(string memory _plate, string memory _newStatus) public {
        require(bytes(vehicles[_plate].plate).length > 0, "Vehicle does not exist");
        vehicles[_plate].status = _newStatus;
    }
}
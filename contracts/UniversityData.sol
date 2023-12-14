// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UniversityData {
    struct Student {
        uint256 studentId;
        string name;
        string programme;
        uint256 joinYear;
        uint256 cgpa;       // Stored as integer, e.g., 350 for 3.50
        uint256 graduateYear;
    }

    mapping(uint256 => Student) private students;
    // Mapping for hashes to ensure data integrity
    mapping(uint256 => bytes32) private studentDataHashes;

    // Event declarations
    event StudentAdded(uint256 indexed studentId);
    event StudentUpdated(uint256 indexed studentId);
    event ErrorLog(string message);

    // Constructor for any initial setup
    constructor() {
        // Initialization (if needed)
    }

    // Function to add or update student data
    function addOrUpdateStudent(uint256 _studentId, string memory _name, string memory _programme, uint256 _joinYear, uint256 _cgpa, uint256 _graduateYear) public {
        require(_studentId != 0, "Invalid Student ID");
        require(_cgpa <= 400, "Invalid CGPA");

        students[_studentId] = Student(_studentId, _name, _programme, _joinYear, _cgpa, _graduateYear);
        bytes32 dataHash = sha256(abi.encodePacked(_studentId, _name, _programme, _joinYear, _cgpa, _graduateYear));
        studentDataHashes[_studentId] = dataHash;

        if (_cgpa == 0 && _graduateYear == 0) {
            emit StudentAdded(_studentId);
        } else {
            emit StudentUpdated(_studentId);
        }
    }

    // Getter function to retrieve student details
    function getStudent(uint256 studentId) public view returns (Student memory) {
        require(studentId != 0, "Invalid Student ID");
        return students[studentId];
    }

    // Function to get the hash of student data for verification
    function getStudentDataHash(uint256 studentId) public view returns (bytes32) {
        require(studentId != 0, "Invalid Student ID");
        return studentDataHashes[studentId];
    }

    // Additional functions and logic as needed...
}

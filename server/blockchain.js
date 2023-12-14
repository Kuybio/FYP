const Web3 = require('web3');
const contractABI = require('../build/contracts/UniversityData.json').abi; // Update the path to your contract's ABI
const contractAddress = '0x6c35F6F7F727A7bB676e5BB73Ff66C6240D5B50c'; // Replace with your deployed contract address

// Connect to Ethereum network (Ganache, Infura, Alchemy, etc.)
const web3 = new Web3('http://localhost:7545'); // Replace with your Ethereum node URL

// Create a contract instance
const universityDataContract = new web3.eth.Contract(contractABI, contractAddress);

// Function to add or update a student on the blockchain
const addOrUpdateStudent = async (studentId, name, programme, joinYear, cgpa, graduateYear, fromAddress, privateKey) => {
    // Check if cgpa and graduateYear are not null or undefined
    cgpa = cgpa ?? 0; // If cgpa is null/undefined, default to 0
    graduateYear = graduateYear ?? 0; // If graduateYear is null/undefined, default to 0

    const data = universityDataContract.methods.addOrUpdateStudent(studentId, name, programme, joinYear, cgpa, graduateYear).encodeABI();

    const tx = {
        from: fromAddress,
        to: contractAddress,
        gas: 2000000, // Set the gas limit
        data: data
    };

    const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
    return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};

// Function to retrieve student details from the blockchain
const getStudent = async (studentId) => {
    return universityDataContract.methods.getStudent(studentId).call();
};

// Function to get the hash of student data
const getStudentDataHash = async (studentId) => {
    return universityDataContract.methods.getStudentDataHash(studentId).call();
};

module.exports = {
    addOrUpdateStudent,
    getStudent,
    getStudentDataHash
};

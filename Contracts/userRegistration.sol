// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract UserRegistration {

    uint256 userCount;

    struct UserData {
        string _name;
        string _email;
        bytes32 _passwordHash; 
        string _avatar_public_id;
        string _avatar_url;
        uint[] _course_id;
        string[] _poster;
        bool _registered;
        string[] _subscription_id;
        uint _score;
    }

    UserData[] public users;

    // Register a user
    function registerUser(
        string memory _name,
        string memory _email,
        string memory _password,
        string memory _avatar_public_id,
        string memory _avatar_url
    ) public returns (bool) {
        // Check if user already exists
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(abi.encodePacked(users[i]._email)) == keccak256(abi.encodePacked(_email))) {
                return false;
            }
        }
        bytes32 passwordHash = keccak256(abi.encodePacked(_password)); // Hash the password
        // Push the UserData struct with default values for certain fields
        users.push(UserData(
            _name, 
            _email, 
            passwordHash, 
            _avatar_public_id,
            _avatar_url,
            new uint[](0)  ,
            new string[](0)  ,
            true, 
            new string[](0)  ,
            0 
        ));
        userCount++;
        return true;
    }

    // Login a user
    function loginUser(string memory _email, string memory _password) public view returns (UserData memory user) {
        bytes32 passwordHash = keccak256(abi.encodePacked(_password)); // Hash the input password
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(abi.encodePacked(users[i]._email)) == keccak256(abi.encodePacked(_email))) {
                if (users[i]._passwordHash == passwordHash) { // Compare hashed password
                    return users[i];
                }
            }
        }
        revert("Invalid username or password");
    }

    // Get user count
    function getUserCount() public view returns (uint256) {
        return userCount;
    }

    // Check if a user is registered
    function isUserRegistered(string memory _email) public view returns (bool) {
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(abi.encodePacked(users[i]._email)) == keccak256(abi.encodePacked(_email))) {
                return true;
            }
        }
        return false;
    }

    // Function to add score to a user
    function addScore(string memory _email, uint _amount) public {
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(abi.encodePacked(users[i]._email)) == keccak256(abi.encodePacked(_email))) {
                users[i]._score += _amount;
                return;
            }
        }
        revert("User not found");
    }

    // Function to subtract score from a user
    function subtractScore(string memory _email, uint _amount) public {
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(abi.encodePacked(users[i]._email)) == keccak256(abi.encodePacked(_email))) {
                if (users[i]._score >= _amount) {
                    users[i]._score -= _amount;
                    return;
                } else {
                    revert("Insufficient score");
                }
            }
        }
        revert("User not found");
    }

    // Function to create a new course
    function makeCourse(string memory _email, uint _courseId,string memory _poster) public {
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(abi.encodePacked(users[i]._email)) == keccak256(abi.encodePacked(_email))) {
                users[i]._course_id.push(_courseId);
                users[i]._poster.push(_poster);
                return;
            }
        }
        revert("User not found");
    }

    // Function to delete a course
    function deleteCourse(string memory _email, uint _courseId) public {
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(abi.encodePacked(users[i]._email)) == keccak256(abi.encodePacked(_email))) {
                for (uint j = 0; j < users[i]._course_id.length; j++) {
                    if (users[i]._course_id[j] == _courseId) {
                        delete users[i]._course_id[j];
                        delete users[i]._poster[j];
                        return;
                    }
                }
                revert("Course not found");
            }
        }
        revert("User not found");
    }

    // Function to subscribe to a course
    function subscribeToCourse(string memory _email, string memory _courseId) public {
        for (uint256 i = 0; i < users.length; i++) {
            if (keccak256(abi.encodePacked(users[i]._email)) == keccak256(abi.encodePacked(_email))) {
                users[i]._subscription_id.push(_courseId);
                return;
            }
        }
        revert("User not found");
    }
}

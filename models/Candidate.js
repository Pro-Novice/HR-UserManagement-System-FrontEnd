const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    validate: {
      validator: function(v) {
        // 1. Remove all non-number characters (dashes, spaces, parentheses)
        const cleaned = v.replace(/\D/g, '');
        
        // 2. Make sure it is exactly 10 digits long
        return cleaned.length === 10;
      },
      // This message shows up if validation fails
      message: props => `${props.value} is not a valid 10-digit phone number!`
    }
  },
  address: {
    street1: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true
    },
    street2: {
        type: String,
      required: false, // Optional (for Apt, Suite, Room)
      trim: true
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true
    },
    state: {
              type: String,
      required: [true, 'State is required'],
      uppercase: true, // Forces state to be stored in ALL CAPS (e.g., 'NY')
      trim: true,
      minLength: 2,
      maxLength: 2 // Restricts to standard 2-letter state codes
    },
    zip: {
        required: [true, 'ZIP code is required'],
        type: String,
        validate: {
          validator: function(v) {
            // Validates 5-digit ZIP or ZIP+4 format (e.g., 12345 or 12345-6789)
            return /^\d{5}(-\d{4})?$/.test(v);
          },
          message: props => `${props.value} is not a valid ZIP code!`
        }
    }
  },
  gender: {
    type: String,
    required: [true, 'Gender selection is required'],
    trim: true,
    lowercase: true, // Converts "Male" or "MALE" to "male" automatically
    enum: {
      values: ['male', 'female', 'non-binary', 'prefer-not-to-say'],
      message: '{VALUE} is not a valid gender option' // Error message for invalid choices
    }
  },
    dob: {
    type: Date,
    required: [true, 'Date of birth is required'],
    validate: {
      validator: function(value) {
        // Ensures the date of birth is in the past (not today or in the future)
        return value < new Date();
      },
      message: 'Date of birth must be a past date!'
    }
  },
    dateOfRegistration: {
    type: Date,
    required: true,
    default: Date.now // Automatically sets the current date and time upon creation
  },
  isActive: {
    type: Boolean,
    required: true,
    default: true // New users are active by default until changed
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'employee',
    required: true
}
});

module.exports = User = mongoose.model('candidate', UserSchema);
import mongoose from 'mongoose';

const contactSubmissionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      default: '',
    },
    company: {
      type: String,
      default: '',
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'in-progress', 'archived'],
      default: 'new',
    },
  },
  {
    timestamps: true,
  }
);

const ContactSubmission = mongoose.model('ContactSubmission', contactSubmissionSchema);
export default ContactSubmission;

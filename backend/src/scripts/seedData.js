const mongoose = require('mongoose');
require('dotenv').config();

const Admin = require('../models/Admin');
const Event = require('../models/Event');
const CommitteeMember = require('../models/CommitteeMember');
const GalleryImage = require('../models/GalleryImage');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('📦 MongoDB Connected for seeding');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    process.exit(1);
  }
};

const seedAdmins = async () => {
  try {
    // Clear existing admins
    await Admin.deleteMany({});

    const admins = [
      {
        email: 'admin@csi-kkwieer.com',
        password: 'admin123',
        name: 'CSI Admin',
        role: 'super_admin',
      },
      {
        email: 'moderator@csi-kkwieer.com',
        password: 'moderator123',
        name: 'CSI Moderator',
        role: 'moderator',
      },
    ];

    await Admin.create(admins);
    console.log('✅ Admins seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding admins:', error);
  }
};

const seedEvents = async () => {
  try {
    // Clear existing events
    await Event.deleteMany({});

    const admin = await Admin.findOne({ role: 'super_admin' });
    if (!admin) {
      console.error('❌ No admin found for events');
      return;
    }

    const events = [
      {
        title: 'CSI Installation Ceremony 2025',
        description: 'Installation ceremony for the new board members of CSI KKWIEER for academic year 2025-26. Every ending writes a new beginning, together we carry the legacy ahead.',
        shortDesc: 'Installation ceremony for new board members',
        category: 'ceremony',
        status: 'completed',
        startDate: new Date('2025-08-11'),
        startTime: '13:00',
        endTime: '17:00',
        location: 'JVN Hall',
        maxCapacity: 200,
        participants: 45,
        attendees: 45,
        image: '/images/installation.jpg',
        images: ['/images/installation.jpg'],
        isActive: true,
        isFeatured: true,
        adminId: admin._id,
      },
      {
        title: 'Google Cohort Programme',
        description: 'The Department of Computer Engineering at KKWIEER hosted the Google Cloud Arcade Facilitator Program 2025 – Cohort 2 Guidance Sessions, aimed at introducing students to cloud learning opportunities, gamified upskilling, and community building.',
        shortDesc: 'Google Cloud learning opportunities',
        category: 'workshop',
        status: 'completed',
        startDate: new Date('2025-08-05'),
        startTime: '10:00',
        endTime: '12:00',
        location: 'JVN Hall',
        maxCapacity: 150,
        participants: 120,
        attendees: 120,
        image: '/images/cohort.jpg',
        images: ['/images/cohort.jpg'],
        isActive: true,
        isFeatured: false,
        adminId: admin._id,
      },
      {
        title: 'Campus To Corporate 3.0',
        description: 'Campus to Corporate was a powerful-packed session filled with industry trends, career insights, and practical tips to help students transition from academic life to the corporate world with confidence.',
        shortDesc: 'Career guidance and industry insights',
        category: 'talks',
        status: 'published',
        startDate: new Date('2025-03-17'),
        startTime: '09:00',
        endTime: '17:00',
        location: 'Multiple Labs',
        maxCapacity: 200,
        participants: 180,
        attendees: 180,
        registrationDeadline: new Date('2025-03-15'),
        image: '/images/c2c.jpg',
        images: ['/images/c2c.jpg'],
        isActive: true,
        isFeatured: true,
        adminId: admin._id,
      },
      {
        title: 'E-Yantran 2024-25',
        description: 'Turn your trash into Treasure is what we followed in E-Yantran 2025. A flagship initiative, driving change through E-Waste awareness and collection, empowering communities for a sustainable future.',
        shortDesc: 'E-Waste awareness and collection drive',
        category: 'activity',
        status: 'completed',
        startDate: new Date('2025-01-28'),
        startTime: '09:00',
        endTime: '16:00',
        location: 'Multiple Labs',
        maxCapacity: 100,
        participants: 32,
        attendees: 32,
        image: '/images/eyantran.jpg',
        images: ['/images/eyantran.jpg'],
        isActive: true,
        isFeatured: false,
        adminId: admin._id,
      },
    ];

    await Event.create(events);
    console.log('✅ Events seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding events:', error);
  }
};

const seedCommitteeMembers = async () => {
  try {
    // Clear existing committee members
    await CommitteeMember.deleteMany({});

    const members2025 = [
      {
        name: 'Ankit Khandelwal',
        position: 'President',
        year: '2025',
        email: 'ankit@kkwieer.edu.in',
        linkedin: 'https://www.linkedin.com/in/ankit-khandelwal-002474295',
        image: '/images/2025/1Ankit.png',
        description: 'Leading CSI KKWIEER with vision and dedication',
        isActive: true,
      },
      {
        name: 'Manasi Jadhav',
        position: 'Vice-President',
        year: '2025',
        email: 'manasi@kkwieer.edu.in',
        linkedin: 'https://www.linkedin.com/in/manasi-jadhav-3ba44228b',
        image: '/images/2025/2Manasi.png',
        description: 'Supporting leadership and driving initiatives',
        isActive: true,
      },
      {
        name: 'Shweta Yeola',
        position: 'Secretary',
        year: '2025',
        email: 'shweta@kkwieer.edu.in',
        linkedin: 'http://www.linkedin.com/in/shweta-yeola-3a8075296',
        image: '/images/2025/3Shweta.png',
        description: 'Managing communications and documentation',
        isActive: true,
      },
      {
        name: 'Meghraj Bhavsar',
        position: 'Joint-Secretary',
        year: '2025',
        email: 'meghraj@kkwieer.edu.in',
        linkedin: 'https://www.linkedin.com/in/meghraj-bhavsar-3449ba289',
        image: '/images/2025/4Meghraj.png',
        description: 'Assisting in administrative tasks and coordination',
        isActive: true,
      },
      {
        name: 'Atharva Jadhav',
        position: 'Treasurer',
        year: '2025',
        email: 'atharva@kkwieer.edu.in',
        linkedin: 'https://www.linkedin.com/in/atharva-jadhav-73a997295',
        image: '/images/2025/5Atharva.png',
        description: 'Managing finances and budget planning',
        isActive: true,
      },
      {
        name: 'Sadique Khatib',
        position: 'Joint Treasurer',
        year: '2025',
        email: 'sadique@kkwieer.edu.in',
        linkedin: 'https://www.linkedin.com/in/sadique-khatib-4175342a9',
        image: '/images/2025/6Sadique.png',
        description: 'Supporting financial management and planning',
        isActive: true,
      },
    ];

    // Add some core committee members
    const coreMembers2025 = [
      {
        name: 'Sarthak Pawar',
        position: 'Core Committee',
        year: '2025',
        linkedin: 'https://www.linkedin.com/in/sarthak-pawar',
        image: '/images/2025/14Sarthak.png',
        description: 'Technical team member',
        isActive: true,
      },
      {
        name: 'Yash Gatkal',
        position: 'Core Committee',
        year: '2025',
        linkedin: 'https://www.linkedin.com/in/yash-gatkal-b55b18219',
        image: '/images/2025/15Yash.png',
        description: 'Core committee member',
        isActive: true,
      },
    ];

    await CommitteeMember.create([...members2025, ...coreMembers2025]);
    console.log('✅ Committee members seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding committee members:', error);
  }
};

const seedGalleryImages = async () => {
  try {
    // Clear existing gallery images
    await GalleryImage.deleteMany({});

    const admin = await Admin.findOne({ role: 'super_admin' });
    if (!admin) {
      console.error('❌ No admin found for gallery images');
      return;
    }

    const galleryImages = [
      {
        title: 'CSI Installation Ceremony',
        description: 'Installation ceremony for new board members',
        imageUrl: '/images/installation.jpg',
        eventName: 'CSI Installation Ceremony 2025',
        category: 'ceremony',
        isActive: true,
        uploadedBy: admin._id,
      },
      {
        title: 'Google Cohort Programme',
        description: 'Students participating in Google Cloud learning',
        imageUrl: '/images/cohort.jpg',
        eventName: 'Google Cohort Programme',
        category: 'workshop',
        isActive: true,
        uploadedBy: admin._id,
      },
      {
        title: 'Campus To Corporate Session',
        description: 'Career guidance session for students',
        imageUrl: '/images/c2c.jpg',
        eventName: 'Campus To Corporate 3.0',
        category: 'talks',
        isActive: true,
        uploadedBy: admin._id,
      },
      {
        title: 'E-Yantran Initiative',
        description: 'E-waste collection and awareness drive',
        imageUrl: '/images/eyantran.jpg',
        eventName: 'E-Yantran 2024-25',
        category: 'activity',
        isActive: true,
        uploadedBy: admin._id,
      },
    ];

    await GalleryImage.create(galleryImages);
    console.log('✅ Gallery images seeded successfully');
  } catch (error) {
    console.error('❌ Error seeding gallery images:', error);
  }
};

const seedAll = async () => {
  try {
    await connectDB();
    
    console.log('🌱 Starting database seeding...');
    
    await seedAdmins();
    await seedEvents();
    await seedCommitteeMembers();
    await seedGalleryImages();
    
    console.log('🎉 Database seeding completed successfully!');
    
    console.log('\n📋 Seeded Data Summary:');
    console.log('- Super Admin: admin@csi-kkwieer.com / admin123');
    console.log('- Moderator: moderator@csi-kkwieer.com / moderator123');
    console.log('- Events: 4 sample events');
    console.log('- Committee Members: 8 members for 2025');
    console.log('- Gallery Images: 4 sample images');
    
  } catch (error) {
    console.error('❌ Error during seeding:', error);
  } finally {
    await mongoose.connection.close();
    console.log('📦 Database connection closed');
    process.exit(0);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedAll();
}

module.exports = { seedAll };
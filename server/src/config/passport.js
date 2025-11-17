const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const prisma = require('./prisma');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      passReqToCallback: true, // Pass request to callback to access state
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const googleId = profile.id;
        const role = req.query.state || 'USER'; // Get role from state parameter
        
        console.log('Google OAuth callback - Role:', role, 'Email:', email);
        
        // First try to find user by googleId in User table
        let user = await prisma.user.findFirst({
          where: { googleId },
        });
        
        // If not found by googleId, try by email in User table
        if (!user) {
          user = await prisma.user.findUnique({
            where: { email },
          });
        }
        
        // If role is DONOR, also check Donor table
        let donor = null;
        if (role === 'DONOR') {
          donor = await prisma.donor.findFirst({
            where: { googleId },
          });
          
          if (!donor) {
            donor = await prisma.donor.findUnique({
              where: { email },
            });
          }
        }

        // If logging in as DONOR and donor account exists
        if (role === 'DONOR' && donor) {
          if (!donor.googleId) {
            const updatedDonor = await prisma.donor.update({
              where: { id: donor.id },
              data: { 
                googleId,
                emailVerified: true,
              },
            });
            updatedDonor.role = 'DONOR'; // Add role for token generation
            return done(null, updatedDonor);
          }
          donor.role = 'DONOR';
          return done(null, donor);
        }
        
        // If logging in as USER and user account exists
        if (role === 'USER' && user) {
          if (!user.googleId) {
            const updatedUser = await prisma.user.update({
              where: { id: user.id },
              data: { 
                googleId,
                emailVerified: true,
              },
            });
            return done(null, updatedUser);
          }
          return done(null, user);
        }
        
        // Create new account based on role
        if (role === 'DONOR') {
          const newDonor = await prisma.donor.create({
            data: {
              email,
              name: profile.displayName,
              googleId,
              emailVerified: true,
            },
          });
          newDonor.role = 'DONOR';
          return done(null, newDonor);
        } else {
          const newUser = await prisma.user.create({
            data: {
              email,
              name: profile.displayName,
              googleId,
              emailVerified: true,
              role: 'USER', // Explicitly set role
            },
          });
          return done(null, newUser);
        }
      } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error, false);
      }
    }
  )
);

// LinkedIn OAuth Strategy
passport.use(
  new LinkedInStrategy(
    {
      clientID: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      callbackURL: process.env.LINKEDIN_CALLBACK_URL,
      scope: ['openid', 'profile', 'email'], // Updated to OIDC scopes
      passReqToCallback: true, // Pass request to callback to access state
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const linkedinId = profile.id;
        const role = req.query.state || 'USER'; // Get role from state parameter
        
        console.log('LinkedIn OAuth callback - Role:', role, 'Email:', email);
        
        // First try to find user by linkedinId in User table
        let user = await prisma.user.findFirst({
          where: { linkedinId },
        });
        
        // If not found by linkedinId, try by email in User table
        if (!user) {
          user = await prisma.user.findUnique({
            where: { email },
          });
        }
        
        // If role is DONOR, also check Donor table
        let donor = null;
        if (role === 'DONOR') {
          donor = await prisma.donor.findFirst({
            where: { linkedinId },
          });
          
          if (!donor) {
            donor = await prisma.donor.findUnique({
              where: { email },
            });
          }
        }

        // If logging in as DONOR and donor account exists
        if (role === 'DONOR' && donor) {
          if (!donor.linkedinId) {
            const updatedDonor = await prisma.donor.update({
              where: { id: donor.id },
              data: { 
                linkedinId,
                emailVerified: true,
              },
            });
            updatedDonor.role = 'DONOR'; // Add role for token generation
            return done(null, updatedDonor);
          }
          donor.role = 'DONOR';
          return done(null, donor);
        }
        
        // If logging in as USER and user account exists
        if (role === 'USER' && user) {
          if (!user.linkedinId) {
            const updatedUser = await prisma.user.update({
              where: { id: user.id },
              data: { 
                linkedinId,
                emailVerified: true,
              },
            });
            return done(null, updatedUser);
          }
          return done(null, user);
        }
        
        // Create new account based on role
        if (role === 'DONOR') {
          const newDonor = await prisma.donor.create({
            data: {
              email,
              name: profile.displayName,
              linkedinId,
              emailVerified: true,
            },
          });
          newDonor.role = 'DONOR';
          return done(null, newDonor);
        } else {
          const newUser = await prisma.user.create({
            data: {
              email,
              name: profile.displayName,
              linkedinId,
              emailVerified: true,
              role: 'USER', // Explicitly set role
            },
          });
          return done(null, newUser);
        }
      } catch (error) {
        console.error('LinkedIn OAuth error:', error);
        return done(error, false);
      }
    }
  )
);

// Debug: print configured OAuth callbacks for verification
console.log('Passport Google strategy configured with callback URL:', process.env.GOOGLE_CALLBACK_URL);
console.log('Passport LinkedIn strategy configured with callback URL:', process.env.LINKEDIN_CALLBACK_URL);
console.log('Passport Google client ID:', process.env.GOOGLE_CLIENT_ID ? '[REDACTED]' : 'not set');
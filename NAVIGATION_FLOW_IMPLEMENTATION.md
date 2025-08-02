# Navigation Flow Implementation

## Overview
I've implemented a conditional navigation system that routes users to different home screens based on their `userType` after OTP authentication and verification.

## Flow Description

### 1. Authentication (auth.tsx)
- User enters phone number and OTP
- System authenticates against `testUsers` data
- Upon successful authentication:
  - User is stored in context (`UserContext`)
  - If user is verified: Navigate to home
  - If user is not verified: Navigate to verification screen

### 2. Verification (verification.tsx)
- Shows document upload interface
- After successful verification (simulated):
  - Updates user's `isVerified` status to `true`
  - Navigates to home screen

### 3. Home Screen Navigation (home.tsx)
- Reads current user from context
- Shows appropriate interface based on `userType`:
  - If `userType === 'resident'`: Shows `ResidentHome` component
  - If `userType === 'guard'`: Shows `GuardHome` component

## Key Components

### UserContext (lib/userContext.tsx)
- React Context for managing authenticated user state
- Provides `currentUser` and `setCurrentUser` throughout the app
- Wrapped around the entire app in `_layout.tsx`

### Test Users (lib/testData.ts)
Available test users for demonstration:
1. **Resident (Verified)**: Phone `7451235671`, OTP `4545` → Goes directly to ResidentHome
2. **Guard (Verified)**: Phone `9876543210`, OTP `4545` → Goes directly to GuardHome  
3. **Guard (Unverified)**: Phone `1234567890`, OTP `4545` → Goes to verification first, then GuardHome

## Testing the Flow

### Test Case 1: Verified Resident
1. Login with phone: `7451235671`, OTP: `4545`
2. Should navigate directly to ResidentHome interface

### Test Case 2: Verified Guard
1. Login with phone: `9876543210`, OTP: `4545`
2. Should navigate directly to GuardHome interface

### Test Case 3: Unverified Guard
1. Login with phone: `1234567890`, OTP: `4545`
2. Goes to verification screen
3. Upload document and submit
4. After approval (5 seconds), navigates to GuardHome interface

## Files Modified
- `app/_layout.tsx` - Added UserProvider wrapper
- `app/auth.tsx` - Added user context integration
- `app/verification.tsx` - Added conditional navigation based on userType
- `app/(tab)/home.tsx` - Updated to use user context instead of hardcoded userType
- `lib/testData.ts` - Added unverified guard user for testing
- `lib/userContext.tsx` - New user context implementation

## Key Features
- ✅ Dynamic navigation based on userType
- ✅ Persistent user state across screens
- ✅ Proper separation of Resident and Guard interfaces
- ✅ Verification flow integration
- ✅ Multiple test scenarios supported

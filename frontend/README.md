# GigFlow Frontend

A modern, responsive React.js frontend for the GigFlow freelance marketplace platform built with Vite, Redux Toolkit, and Tailwind CSS.

## 🚀 Features

### Authentication
- **User Registration**: Sign up with name, email, and password
- **User Login**: Secure login with form validation
- **Protected Routes**: Dashboard and gig creation are protected routes
- **State Persistence**: User authentication state managed with Redux

### Gig Management
- **Browse Gigs**: View all open jobs in a responsive grid layout
- **Search & Filter**: Search gigs by title and description in real-time
- **Gig Details**: View complete gig information including budget and status
- **Create Gigs**: Post new jobs with title, description, and budget
- **Gig Status**: Track whether gigs are open or assigned

### Bidding System
- **Submit Bids**: Freelancers can submit competitive bids with price and message
- **View Bids**: Clients can see all bids received for their gigs
- **Bid Status Tracking**: Visual indicators for pending, hired, and rejected bids
- **Hire Freelancers**: Clients can hire the best freelancer with one click

### Dashboard
- **Gig Management**: View and manage all posted gigs
- **Bid Review**: Organized view of all bids by status (Pending, Hired, Rejected)
- **Statistics**: See bid counts and gig status at a glance
- **Quick Actions**: Hire freelancers directly from the dashboard

## 📋 Technology Stack

- **React.js 19** - UI Library
- **Vite 7** - Build tool and dev server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with interceptors
- **Tailwind CSS** - Utility-first CSS framework
- **JavaScript ES6+** - Modern JavaScript

## 🛠️ Project Structure

```
src/
├── api/
│   └── axios.js              # Configured axios instance
├── components/
│   ├── Navbar.jsx            # Navigation bar with auth state
│   ├── GigCard.jsx           # Reusable gig display card
│   ├── BidCard.jsx           # Reusable bid display card
│   └── ProtectedRoute.jsx    # Route protection wrapper
├── pages/
│   ├── Home.jsx              # Landing page
│   ├── Login.jsx             # Login form
│   ├── Register.jsx          # Registration form
│   ├── Gigs.jsx              # Browse gigs page
│   ├── GigDetail.jsx         # Gig details & bid form
│   ├── CreateGig.jsx         # Create new gig form
│   └── Dashboard.jsx         # Client dashboard
├── store/
│   ├── index.js              # Redux store configuration
│   └── slices/
│       ├── authSlice.js      # Auth state & async thunks
│       ├── gigSlice.js       # Gigs state & async thunks
│       └── bidSlice.js       # Bids state & async thunks
├── App.jsx                   # Main app component
├── index.css                 # Global styles & utilities
└── main.jsx                  # Entry point
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend server running on http://localhost:5000

### Installation

1. **Navigate to frontend directory**
```bash
cd frontend
```

2. **Install dependencies**
```bash
npm install
```

3. **Create environment file**
```bash
cp .env.example .env.local
```

4. **Start development server**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## 📝 Environment Variables

Create a `.env.local` file in the frontend root with:
```
VITE_API_URL=http://localhost:5000/api
```

## 📝 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

## 🔑 Core Functionalities

### 1. Authentication Flow
1. User registers with name, email, password
2. Backend validates and creates user account
3. Redux stores user and authentication state
4. JWT token stored in HttpOnly cookies
5. Protected routes check authentication status
6. Logout clears user state and cookies

### 2. Gig Management
1. Authenticated users can create new gigs
2. Gigs displayed in responsive grid with status
3. Real-time search/filter by title and description
4. Gig details page shows full information
5. Status updates when freelancer is hired

### 3. Bidding System
1. Freelancers submit bids with price and message
2. Bids automatically appear in client dashboard
3. Clients review all bids organized by status
4. Single click to hire chosen freelancer
5. Automatic rejection of other bids on hire

## 🎨 UI/UX Design

### Color Scheme
- **Primary**: Indigo (#6366f1) with gradients
- **Secondary**: Purple (#a855f7) & Pink (#ec4899)
- **Success**: Green (#10b981)
- **Error**: Red (#ef4444)
- **Warning**: Yellow (#f59e0b)
- **Neutral**: Gray scale

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly buttons and inputs
- Optimized for all screen sizes
- Sticky navbar on scroll

### Interactive Elements
- Smooth fade and scale transitions
- Loading spinners during async operations
- Success/error toast notifications
- Hover effects on cards and buttons
- Form validation with error messages
- Status badges with color coding

## 🔄 Redux State Management

### Store Structure
```javascript
{
  auth: {
    user: { _id, name, email },
    isAuthenticated: boolean,
    loading: boolean,
    error: string | null
  },
  gigs: {
    gigs: [{ _id, title, description, budget, status, ownerId }],
    currentGig: { ...gig },
    loading: boolean,
    error: string | null
  },
  bids: {
    bids: [{ _id, gigId, freelancerId, price, message, status }],
    loading: boolean,
    error: string | null
  }
}
```

### Async Thunks
- **authSlice**: `registerUser`, `loginUser`, `logoutUser`
- **gigSlice**: `fetchGigs`, `fetchGigById`, `createGig`
- **bidSlice**: `fetchBidsForGig`, `submitBid`, `hireBidder`

## 🔌 API Integration

### Axios Configuration
- Base URL: `http://localhost:5000/api`
- Credentials: true (for cookie handling)
- HttpOnly cookies for secure token storage

### API Endpoints Used
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
POST   /api/auth/logout        - Logout user
GET    /api/gigs               - Fetch all open gigs
GET    /api/gigs/:id           - Fetch specific gig
POST   /api/gigs               - Create new gig (protected)
GET    /api/bids/:gigId        - Get bids for gig (protected)
POST   /api/bids               - Submit new bid (protected)
PATCH  /api/bids/:bidId/hire   - Hire freelancer (protected)
```

## ✅ Form Validations

### Register Form
- Name: Required, non-empty
- Email: Required, valid email format
- Password: Required, minimum 6 characters
- Confirm Password: Must match password field

### Login Form
- Email: Required, valid format
- Password: Required

### Create Gig Form
- Title: Required, non-empty
- Description: Required, detailed
- Budget: Required, must be > 0

### Bid Form
- Price: Required, numeric, > 0
- Message: Required, must explain why you're fit

## 🔒 Security Features

- **Protected Routes**: Dashboard and create gig require authentication
- **HttpOnly Cookies****: Secure token storage, inaccessible to JavaScript
- **CORS Handling**: Configured with credentials for secure cross-origin requests
- **Input Validation**: Client-side validation before submission
- **Error Handling**: Generic error messages to prevent information leakage
- **Authentication Checks**: Protected routes redirect to login if not authenticated

## 🎯 Best Practices Implemented

1. **Component Architecture**: Reusable, single-responsibility components
2. **State Management**: Centralized Redux store for predictable data flow
3. **Async Operations**: Async thunks for API calls with loading/error states
4. **Error Handling**: Comprehensive error catching and user feedback
5. **Loading States**: Visual indicators during API calls
6. **Form Validation**: Client-side validation before submission
7. **Responsive Design**: Mobile-first approach with Tailwind CSS
8. **Code Organization**: Clear folder structure and naming conventions
9. **Performance**: Efficient re-renders, no unnecessary state updates
10. **Accessibility**: Semantic HTML, proper label associations

## 🐛 Troubleshooting

### CORS Errors
- Ensure backend is running on `http://localhost:5000`
- Check CORS is enabled on backend with correct origin
- Verify `withCredentials: true` in axios config

### Authentication Issues
- Clear browser cookies and try logging in again
- Check if backend is returning user data in response
- Verify JWT token is being set in HttpOnly cookies

### Search Not Working
- Ensure backend `/api/gigs` endpoint supports search parameter
- Check network tab for correct query parameters
- Verify backend search implementation

### Bids Not Updating
- Refresh page after hiring to see bid status changes
- Check if backend returns updated bid with new status
- Verify all bids are fetched after hire action

### Styling Issues
- Clear browser cache and rebuild with `npm run build`
- Check if Tailwind CSS is properly configured
- Verify PostCSS and Autoprefixer are installed

## 📈 Future Enhancements

- [ ] Real-time notifications with Socket.io
- [ ] User profiles with portfolio and ratings
- [ ] Review and rating system
- [ ] Payment integration (Stripe/PayPal)
- [ ] Advanced filtering and sorting options
- [ ] Gig analytics dashboard
- [ ] In-app messaging system
- [ ] Dark mode support
- [ ] PWA with offline capabilities
- [ ] Email notifications
- [ ] User profile pictures
- [ ] Bid counter offers
- [ ] Contract management
- [ ] Time tracking for freelancers

## 📚 Learning Resources

- [React Documentation](https://react.dev)
- [Redux Toolkit Documentation](https://redux-toolkit.js.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Vite Documentation](https://vitejs.dev)
- [React Router Documentation](https://reactrouter.com)

## 📄 License

This project is part of the ServiceHive Full Stack Internship Assignment.

## 👥 Support

For issues or questions:
1. Check the browser console for error messages
2. Review the network tab in DevTools
3. Ensure backend is running and accessible
4. Verify environment variables are set correctly
5. Check Redux DevTools for state changes
6. Clear cache and rebuild the project

---

**Built with ❤️ for GigFlow**
**Last Updated**: January 2026

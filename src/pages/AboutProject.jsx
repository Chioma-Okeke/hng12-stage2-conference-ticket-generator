import { useEffect } from "react";
import Button from "../components/shared/Button";
import AnimatedSection from "../components/shared/AnimatedSection";

function AboutProject() {
    useEffect(() => {
        window.scrollTo(0, {
            top: 0,
            behavior: "smooth",
        });
    }, []);

    return (
        <AnimatedSection>
            <div className="mx-auto max-w-[800px] mt-[76px] font-roboto mb-6 p-6 lg:p-12 border border-[#0E464F] bg-[#041E23] flex flex-col gap-8 rounded-[40px]">
                <article className="text-white text-sm lg:text-base font-normal font-['Roboto'] leading-normal">
                    Event Ticket Booking UI – Open Source Practice Project 🎟️
                    <br />
                    <br />
                    Overview
                    <br />
                    <br />
                    This is a beginner-friendly yet practical Event Ticket
                    Booking UI designed for developers to clone, explore, and
                    build upon. The design focuses on a seamless, login-free
                    ticket reservation flow, allowing users to book event
                    tickets quickly and efficiently.
                    <br />
                    <br />
                    The project consists of a three-step ticket booking flow,
                    and developers can extend it further by integrating payment
                    solutions, user authentication (optional), and ticket
                    validation systems.
                    <br />
                    <br />
                    Flow & Features
                    <br />
                    <br />
                    1️⃣ Ticket Selection
                    <br /> • Users can browse available tickets (Free & Paid).
                    <br /> • Ticket options are displayed in a list or card
                    view.
                    <br /> • For Free Tickets → Clicking “Get Free Ticket”
                    proceeds to attendee details.
                    <br /> • For Paid Tickets → Clicking “Purchase Ticket” would
                    ideally open a payment modal.
                    <br />
                    <br />
                    2️⃣ Attendee Details Form
                    <br /> • Users input their Name, Email, and optional Phone
                    Number.
                    <br /> • Profile picture upload option with preview
                    functionality.
                    <br /> • Ticket summary is visible to ensure users review
                    their details before submission.
                    <br />
                    <br />
                    3️⃣ Payment or Success Page
                    <br /> • If the ticket is free, the user is taken directly
                    to the Ticket Confirmation Page.
                    <br /> • If the ticket is paid, developers can integrate
                    Stripe, Paystack, or Flutterwave to process payments before
                    showing the confirmation page.
                    <br /> • Upon successful booking, users should receive:
                    <br /> • A visual ticket preview with a unique QR Code.
                    <br /> • An option to download the ticket as PDF or save it
                    to their device.
                    <br /> • An email confirmation containing ticket details.
                    <br />
                    How to Build This 🚀
                    <br />
                    <br />
                    This UI can be implemented using:
                    <br />
                    <br />
                    📌 Frontend (Next.js or React)
                    <br /> • Component Breakdown:
                    <br /> • TicketCard.tsx → Displays ticket details
                    <br /> • AttendeeForm.tsx → Captures user details
                    <br /> • PaymentModal.tsx → Handles payment processing
                    <br /> • SuccessScreen.tsx → Shows the final ticket preview
                    <br /> • State Management: React’s Context API, Zustand, or
                    Redux (if needed).
                    <br /> • File Handling: Users should be able to upload
                    images (profile picture for ticket) using Firebase Storage,
                    Cloudinary, or local preview with URL.createObjectURL().
                    <br />
                    <br />
                    📌 Backend (Optional)
                    <br /> • If persistence is required, a backend can be built
                    using:
                    <br /> • Node.js & Express or Firebase Functions
                    <br /> • Database: MongoDB, PostgreSQL, or Firebase
                    Firestore to store ticket records
                    <br />
                    <br />
                    📌 Payment Integration
                    <br /> • For paid events, developers should integrate:
                    <br /> • Stripe Checkout (for international transactions)
                    <br /> • Paystack or Flutterwave (for African users)
                    <br />
                    What You’ll Learn 🧑‍💻
                    <br /> • File handling & validation (profile picture
                    uploads).
                    <br /> • Dynamic UI updates based on ticket selection.
                    <br /> • Persisting bookings using local state or a backend.
                    <br /> • Integrating payment gateways for ticket purchases.
                    <br /> • Generating & validating QR Codes for event check-in
                    (Advanced).
                    <br />
                    Need Help? Reach Out! 💬
                </article>
                <div>
                    <p className="text-5xl md:text-[80px] leading-[120px] text-center text-white">
                        💛 Enjoy
                    </p>
                </div>
                <div className="px-12 py-4 w-full max-w-[558px] mx-auto rounded-2xl border border-[#0E464F] flex flex-col-reverse md:flex-row gap-4 md:gap-6">
                    <Button className="flex-1 border border-[#24A0B5] rounded-lg text-[#24A0B5]">
                        Design File
                    </Button>
                    <Button
                        // onClick={nextSection}
                        className="flex-1 bg-[#24A0B5] rounded-lg text-white"
                    >
                        Github code
                    </Button>
                </div>
            </div>
        </AnimatedSection>
    );
}

export default AboutProject;

# Interactive MERN Application (back-end + front-end) (Socket.IO + JWT Auth)

A full-stack real-time chat application built with the MERN stack,
featuring secure authentication using JWT and live messaging powered
by Socket.IO.

---

### JavaScript objects are always allocated on the heap.

    - in JavaScript, memory management is automatic, leaks are already handled.
    - JS uses Garbage collection -> we need heap allocation.
    - leaks can still exist tho.

### Error i encountered: (Coss-origin)

This error happens because your Frontend (running on port 5173) and your Backend (running on port 5001) are on different "origins" (domains/ports). Browsers block these requests by default for security unless the backend explicitly allows them.
Fix: used the `cors` package in the back-end.

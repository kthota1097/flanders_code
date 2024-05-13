document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const errorMessage = document.getElementById('error-message');
    const passwordInput = document.getElementById('password');
    const strengthIndicator = document.getElementById('strength-indicator');
  
    // Function to check password strength
    const checkPasswordStrength = (password) => {
      const strength = {
        0: "Very Weak",
        1: "Weak",
        2: "Medium",
        3: "Strong",
        4: "Very Strong"
      };
  
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
      if (password.match(regex)) {
        return strength[4];
      } else if (password.length >= 8) {
        return strength[3];
      } else if (password.length >= 6) {
        return strength[2];
      } else if (password.length >= 4) {
        return strength[1];
      } else {
        return strength[0];
      }
    };
  
    // Function to update password strength indicator
    const updatePasswordStrength = () => {
      const password = passwordInput.value;
      const strength = checkPasswordStrength(password);
      strengthIndicator.textContent = strength;
      strengthIndicator.className = `strength strength-${strength.toLowerCase().replace(/\s/g, '-')}`;
    };
  
    passwordInput.addEventListener('input', updatePasswordStrength);
  
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = form.username.value;
        const password = form.password.value;

        if (!username || !password) {
            errorMessage.textContent = 'Please fill out both fields.';
            return;
        }

        // Simulate authentication with hashed password
        const hashedPassword = CryptoJS.SHA256(password).toString();
        const storedHashedPassword = 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f'; // Hashed version of 'password123'
        console.log(hashedPassword)
        if (username === 'admin'  && hashedPassword === storedHashedPassword) {
            localStorage.setItem('sessionToken', 'abc123'); // Store session token
            alert('Login successful!');
            // Clear error message
            errorMessage.textContent = '';
            strengthIndicator.textContent = '';
            // Clear form fields
            form.reset();
        } else {
            errorMessage.textContent = 'Invalid username or password.';
        }
    });
    forgotPasswordLink.addEventListener('click', function() {
        // Show forgot password modal
        forgotPasswordModal.style.display = 'block';
      });
    
      modalCloseBtn.addEventListener('click', function() {
        // Close modal when close button is clicked
        forgotPasswordModal.style.display = 'none';
      });
    
      window.addEventListener('click', function(event) {
        // Close modal when user clicks outside of it
        if (event.target === forgotPasswordModal) {
          forgotPasswordModal.style.display = 'none';
        }
    });
});
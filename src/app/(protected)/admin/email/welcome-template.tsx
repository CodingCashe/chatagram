export const welcomeEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Welcome to Our Platform</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f9f9f9;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 20px 0;
    }
    .logo {
      max-width: 150px;
      margin-bottom: 20px;
    }
    .hero {
      background-color: #5046e5;
      color: white;
      padding: 40px 20px;
      text-align: center;
      border-radius: 8px 8px 0 0;
    }
    .hero h1 {
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .content {
      background-color: white;
      padding: 30px;
      border-radius: 0 0 8px 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    }
    .feature {
      margin-bottom: 25px;
      display: flex;
      align-items: flex-start;
    }
    .feature-icon {
      width: 50px;
      height: 50px;
      background-color: #f0f4ff;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 15px;
      flex-shrink: 0;
    }
    .feature-text {
      flex: 1;
    }
    .feature-text h3 {
      margin-top: 0;
      margin-bottom: 5px;
      color: #5046e5;
    }
    .button {
      display: inline-block;
      padding: 12px 24px;
      background-color: #5046e5;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 600;
      margin-top: 20px;
    }
    .footer {
      text-align: center;
      padding: 20px;
      color: #6c757d;
      font-size: 12px;
    }
    .social {
      margin-top: 20px;
      margin-bottom: 20px;
    }
    .social a {
      display: inline-block;
      margin: 0 10px;
    }
    .social img {
      width: 24px;
      height: 24px;
    }
    @media (max-width: 600px) {
      .container {
        width: 100%;
        padding: 10px;
      }
      .hero {
        padding: 30px 15px;
      }
      .content {
        padding: 20px;
      }
      .feature {
        flex-direction: column;
        align-items: center;
        text-align: center;
      }
      .feature-icon {
        margin-right: 0;
        margin-bottom: 15px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://via.placeholder.com/150x50" alt="Company Logo" class="logo">
    </div>
    
    <div class="hero">
      <h1>Welcome to Our Platform, {{user.firstname}}!</h1>
    </div>
    
    <div class="content">
      <p>Hi {{user.firstname}},</p>
      
      <p>Thank you for joining our platform! We're excited to have you on board and can't wait to help you achieve your goals.</p>
      
      <p>Here are a few things you can do to get started:</p>
      
      <div class="feature">
        <div class="feature-icon">
          <img src="https://via.placeholder.com/24" alt="Profile Icon">
        </div>
        <div class="feature-text">
          <h3>Complete Your Profile</h3>
          <p>Add more information about yourself to help us personalize your experience.</p>
        </div>
      </div>
      
      <div class="feature">
        <div class="feature-icon">
          <img src="https://via.placeholder.com/24" alt="Explore Icon">
        </div>
        <div class="feature-text">
          <h3>Explore Features</h3>
          <p>Discover all the powerful tools and features available to help you succeed.</p>
        </div>
      </div>
      
      <div class="feature">
        <div class="feature-icon">
          <img src="https://via.placeholder.com/24" alt="Connect Icon">
        </div>
        <div class="feature-text">
          <h3>Connect Your Accounts</h3>
          <p>Link your social media accounts to maximize your automation potential.</p>
        </div>
      </div>
      
      <div style="text-align: center;">
        <a href="#" class="button">Get Started Now</a>
      </div>
      
      <p style="margin-top: 30px;">If you have any questions or need assistance, feel free to reply to this email or contact our support team.</p>
      
      <p>Best regards,<br>The Team</p>
    </div>
    
    <div class="footer">
      <div class="social">
        <a href="#"><img src="https://via.placeholder.com/24" alt="Facebook"></a>
        <a href="#"><img src="https://via.placeholder.com/24" alt="Twitter"></a>
        <a href="#"><img src="https://via.placeholder.com/24" alt="Instagram"></a>
        <a href="#"><img src="https://via.placeholder.com/24" alt="LinkedIn"></a>
      </div>
      
      <p>© 2023 Your Company. All rights reserved.</p>
      <p>123 Main Street, City, Country</p>
      <p>
        <a href="#" style="color: #6c757d;">Privacy Policy</a> | 
        <a href="#" style="color: #6c757d;">Unsubscribe</a>
      </p>
    </div>
  </div>
</body>
</html>
`


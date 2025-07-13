import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  const teamMembers = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & Lead Artisan',
      image: '/placeholder-bag.jpg',
      bio: 'Sarah started ThisIsKnotty with a passion for creating beautiful, functional crochet pieces. With over 10 years of experience in fiber arts, she leads our team of skilled artisans.',
      specialties: ['Pattern Design', 'Quality Control', 'Customer Relations']
    },
    {
      name: 'Maria Rodriguez',
      role: 'Senior Crochet Artist',
      image: '/placeholder-bag.jpg',
      bio: 'Maria brings her expertise in traditional crochet techniques and modern design to create unique pieces that blend heritage with contemporary style.',
      specialties: ['Complex Patterns', 'Color Theory', 'Material Selection']
    },
    {
      name: 'Emma Thompson',
      role: 'Product Development',
      image: '/placeholder-bag.jpg',
      bio: 'Emma works closely with our artisans to develop new designs and ensure each product meets our high standards for quality and functionality.',
      specialties: ['Design Innovation', 'Market Research', 'Sustainability']
    }
  ];

  const values = [
    {
      title: 'Handcrafted Excellence',
      description: 'Every piece is made by hand with attention to detail and quality craftsmanship.',
      icon: '🎨'
    },
    {
      title: 'Sustainable Materials',
      description: 'We use eco-friendly materials and sustainable practices in our production process.',
      icon: '🌱'
    },
    {
      title: 'Unique Designs',
      description: 'Each bag is unique, reflecting the individual style and creativity of our artisans.',
      icon: '✨'
    },
    {
      title: 'Customer Satisfaction',
      description: 'We prioritize customer happiness and ensure every purchase meets expectations.',
      icon: '💝'
    }
  ];

  const milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'ThisIsKnotty was founded with a simple mission: to create beautiful, functional crochet bags.'
    },
    {
      year: '2021',
      title: 'First Collection',
      description: 'Launched our first collection of handcrafted bags, gaining our first loyal customers.'
    },
    {
      year: '2022',
      title: 'Growing Team',
      description: 'Expanded our team of skilled artisans and introduced new product categories.'
    },
    {
      year: '2023',
      title: 'Online Success',
      description: 'Reached customers nationwide through our online platform and social media presence.'
    },
    {
      year: '2024',
      title: 'Future Forward',
      description: 'Continuing to innovate and expand while maintaining our commitment to quality and craftsmanship.'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="hero-content">
            <h1>Our Story</h1>
            <p>Discover the passion and craftsmanship behind ThisIsKnotty</p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="mission-content">
            <div className="mission-text">
              <h2>Our Mission</h2>
              <p>
                At ThisIsKnotty, we believe that beauty and functionality can coexist in perfect harmony. 
                Our mission is to create handcrafted crochet bags that not only serve their practical purpose 
                but also bring joy and style to everyday life.
              </p>
              <p>
                We started with a simple idea: to transform traditional crochet techniques into modern, 
                fashionable accessories that people would love to carry. Each piece we create is a testament 
                to the skill and dedication of our artisans, who pour their heart and soul into every stitch.
              </p>
            </div>
            <div className="mission-image">
              <img src="/placeholder-bag.jpg" alt="ThisIsKnotty Craftsmanship" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <h2>Our Values</h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-icon">{value.icon}</div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="container">
          <h2>Our Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h3>Design & Inspiration</h3>
                <p>Every design starts with inspiration from nature, fashion trends, and customer feedback. Our team creates unique patterns that blend traditional techniques with modern aesthetics.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h3>Material Selection</h3>
                <p>We carefully select high-quality, sustainable materials that ensure durability and beauty. Each yarn and accessory is chosen for its texture, color, and environmental impact.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h3>Handcrafted Creation</h3>
                <p>Our skilled artisans bring each design to life with precision and care. Every stitch is made by hand, ensuring unique character and exceptional quality.</p>
              </div>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h3>Quality Assurance</h3>
                <p>Each finished piece undergoes thorough quality checks to ensure it meets our high standards. We inspect every detail before it reaches our customers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <h2>Meet Our Team</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <div className="member-image">
                  <img src={member.image} alt={member.name} />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <p className="member-role">{member.role}</p>
                  <p className="member-bio">{member.bio}</p>
                  <div className="member-specialties">
                    <h4>Specialties:</h4>
                    <ul>
                      {member.specialties.map((specialty, idx) => (
                        <li key={idx}>{specialty}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="timeline-section">
        <div className="container">
          <h2>Our Journey</h2>
          <div className="timeline">
            {milestones.map((milestone, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-marker"></div>
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Join Our Community</h2>
            <p>Discover the beauty of handcrafted crochet bags and become part of the ThisIsKnotty family.</p>
            <div className="cta-buttons">
              <a href="/products" className="btn-primary">Shop Our Collection</a>
              <a href="/contact" className="btn-secondary">Get in Touch</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 
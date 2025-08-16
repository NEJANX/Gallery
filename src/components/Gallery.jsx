import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Palette, Sparkles, Eye, Download, Heart, Github, Loader } from 'lucide-react';
import PlaceholderImage from './PlaceholderImage';
import './Gallery.css';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

    function disableScroll() {
        window.addEventListener('wheel', preventScroll, { passive: false });
        window.addEventListener('touchmove', preventScroll, { passive: false });
    }

    function enableScroll() {
        window.removeEventListener('wheel', preventScroll, { passive: false });
        window.removeEventListener('touchmove', preventScroll, { passive: false });
    }

    function preventScroll(e) {
        e.preventDefault();
    }

  // Lock/unlock body scroll when modal opens/closes
  useEffect(() => {
    if (selectedImage) {
      

      enableScroll();
      document.querySelector('.gallery-container').scrollTo(0, 0);
      disableScroll();
      
      // Add modal-open class to body
      document.body.classList.add('modal-open');
      
      
      
      // Cleanup function
      return () => {
        enableScroll();
      };
    }
  }, [selectedImage]);

  // Sample artworks data (replace with your actual images)
  const artworks = useMemo(() => [
    {
      id: 1,
      title: "Dawn Car",
      description: "Sleek Porsche cruises beneath starlit skies, mountains framing serene journey.",
      image: "https://raw.githubusercontent.com/NEJANX/Gallery/refs/heads/main/designs/%5BNEJAN%5D%20Dawn%20Car.png",
      thumbnail: "https://raw.githubusercontent.com/NEJANX/Gallery/refs/heads/main/designs/%5BNEJAN%5D%20Dawn%20Car.png",
      psdFile: "/designs/Dawn_Car/Dawn_Car_NEJAN.psd",
      technique: "Digital Compositing",
      year: "2024"
    },
    {
      id: 2,
      title: "Ghostbusters",
      description: "A fearless ghost hunter battles a sinister spirit in a haunted mansion, neon energy beam cutting through the eerie darkness.",
      image: "https://raw.githubusercontent.com/NEJANX/Gallery/refs/heads/main/designs/%5BNEJAN%5D%20Ghostbusters.png",
      thumbnail: "https://raw.githubusercontent.com/NEJANX/Gallery/refs/heads/main/designs/%5BNEJAN%5D%20Ghostbusters.png",
      psdFile: "/designs/Ghostbusters/Ghostbusters_NEJAN.psd",
      technique: "Photo Manipulation",
      year: "2024"
    },
    {
      id: 3,
      title: "Mr. Robot - DDoS Investigation",
      description: "A man intensely focused on server data during a cyber investigation. (Adapted from Mr. Robot TV series.)",
      image: "https://raw.githubusercontent.com/NEJANX/Gallery/refs/heads/main/designs/%5BNEJAN%5D%20Mr.%20Robot%20-%20DDoS%20Investigation.png",
      thumbnail: "https://raw.githubusercontent.com/NEJANX/Gallery/refs/heads/main/designs/%5BNEJAN%5D%20Mr.%20Robot%20-%20DDoS%20Investigation.png",
      psdFile: "/designs/Mr._Robot_-_DDoS_Investigation/Mr._Robot_-_DDoS_Investigation_NEJAN.psd",
      technique: "Mixed Media",
      year: "2024"
    },
    {
      id: 4,
      title: "Stranger Things",
      description: "A lone figure faces a fiery, ominous sky in 'Stranger Things.'",
      image: "https://raw.githubusercontent.com/NEJANX/Gallery/refs/heads/main/designs/%5BNEJAN%5D%20Stranger%20Things.png",
      thumbnail: "https://raw.githubusercontent.com/NEJANX/Gallery/refs/heads/main/designs/%5BNEJAN%5D%20Stranger%20Things.png",
      psdFile: "/designs/Stranger_Things/Stranger_Things_NEJAN.psd",
      technique: "Color Grading",
      year: "2024"
    },
    {
      id: 5,
      title: "NEJAN at Subway",
      description: "A confident man in a green GAP hoodie stands in a subway station.",
      image: "https://raw.githubusercontent.com/NEJANX/Gallery/refs/heads/main/designs/%5BNEJAN%5D%20NEJAN%20at%Subway.png",
      thumbnail: "https://raw.githubusercontent.com/NEJANX/Gallery/refs/heads/main/designs/%5BNEJAN%5D%20NEJAN%20at%Subway%20-%20Thumbnail.png",
      psdFile: "/designs/NEJAN_at_Subway/NEJAN_at_Subway.psd",
      technique: "Digital Painting",
      year: "2024"
    },
    {
      id: 6,
      title: "NEJAN at Street",
      description: "A man in a GAP hoodie stands confidently on a street at night. The scene is enhanced with vibrant colors and a cinematic feel.",
      image: "https://raw.githubusercontent.com/NEJANX/Gallery/refs/heads/main/designs/%5BNEJAN%5D%20NEJAN%20at%Street.png",
      thumbnail: "https://raw.githubusercontent.com/NEJANX/Gallery/refs/heads/main/designs/%5BNEJAN%5D%20NEJAN%20at%Street.png",
      psdFile: "/designs/NEJAN_at_Street/NEJAN_at_Street.psd",
      technique: "HDR Processing",
      year: "2024"
    }
  ], []);

  // Memoized animation variants for better performance
  const frameVariants = useMemo(() => ({
    initial: { 
      scale: 1,
      opacity: 1
    },
    hover: { 
      scale: 1.02,
      opacity: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    }
  }), []);

  const modalVariants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { 
        duration: 0.2,
        ease: "easeIn"
      }
    }
  }), []);

  // Memoized handlers to prevent unnecessary re-renders
  const handleImageSelect = useCallback((artwork) => {
    setSelectedImage(artwork);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedImage(null);
  }, []);

  const handleModalClick = useCallback((e) => {
    e.stopPropagation();
  }, []);

  // Download PSD file handler
  const handleDownloadPSD = useCallback((psdFile, title) => {
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = psdFile;
    link.download = `${title.replace(/\s+/g, '_')}.psd`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <div className="gallery-container">
      <div className="gallery-background">
        <div className="wall-texture"></div>
        <div className="ambient-light"></div>
      </div>

      <header className="gallery-header">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="header-content"
        >
          <div className="logo">
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="logo-icon" />
            </motion.div>
            <h1>NEJAN's Art Gallery</h1>
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <Sparkles className="logo-icon" />
            </motion.div>
          </div>
          <p className="subtitle">Photo Manipulation Showcase</p>
        </motion.div>
      </header>

      <motion.main 
        className="gallery-main"
      >
        <div className="gallery-grid">
          {artworks.map((artwork, index) => (
            <ArtworkFrame
              key={artwork.id}
              artwork={artwork}
              index={index}
              frameVariants={frameVariants}
              onSelect={handleImageSelect}
            />
          ))}
        </div>
      </motion.main>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(20px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            onClick={handleCloseModal}
          >
            <motion.div
              className="modal-content"
              variants={{
                hidden: { opacity: 0, scale: 0.8, y: 0 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", damping: 25, stiffness: 500 } },
                exit: { opacity: 0, scale: 0.8, y: 0 }
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={handleModalClick}
              style={{
                transformOrigin: "center center"
              }}
            >
              <motion.button 
                className="modal-close"
                onClick={handleCloseModal}
                whileHover={{
                  scale: 1.1,
                  rotate: 90,
                  backgroundColor: "rgba(255, 0, 0, 0.3)"
                }}
                whileTap={{ scale: 0.9 }}
              >
                <X />
              </motion.button>
              
              <motion.div 
                className="modal-image-container"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {/* We need to create a new loading state when modal opens */}
                <ModalImage image={selectedImage.image} title={selectedImage.title} id={selectedImage.id} />
              </motion.div>
              
              <motion.div 
                className="modal-info"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
              >
                <motion.h2 
                  className="modal-title"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  {selectedImage.title}
                </motion.h2>
                <motion.p 
                  className="modal-description"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.5 }}
                >
                  {selectedImage.description}
                </motion.p>
                {/* <motion.div 
                  className="modal-meta"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                >
                  <span className="meta-item">
                    <Camera className="meta-icon" />
                    {selectedImage.technique}
                  </span>
                  <span className="meta-item">{selectedImage.year}</span>
                </motion.div> */}
                
                <motion.button
                  className="download-psd-btn"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                  onClick={() => handleDownloadPSD(selectedImage.psdFile, selectedImage.title)}
                  whileHover={{ 
                    scale: 1.05,
                    backgroundColor: "rgba(0, 255, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="download-icon" />
                  Download PSD File
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.footer 
        className="gallery-footer"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <div className="footer-content">
          <motion.p 
            className="copyright"
            whileHover={{ scale: 1.05 }}
          >
            <Heart className="footer-icon" size={14} /> 
            <span>Created with passion by NEJAN © {new Date().getFullYear()}</span>
          </motion.p>
          <div className="footer-links">
            <motion.a 
              href="https://github.com/NEJANX" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github size={16} />
            </motion.a>
          </div>
        </div>
      </motion.footer>
    </div>
  );
};

// Memoized ArtworkFrame component to prevent unnecessary re-renders
const ArtworkFrame = React.memo(({ artwork, index, frameVariants, onSelect }) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleClick = useCallback(() => {
    onSelect(artwork);
  }, [artwork, onSelect]);

  // Handle image load
  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  // Memoized animation variants for tap
  const tapVariant = useMemo(() => ({
    scale: 0.98,
    transition: { duration: 0.1 }
  }), []);

  // Memoized hover variants
  const imageHoverVariant = useMemo(() => ({
    scale: 1.05
  }), []);

  const overlayHoverVariant = useMemo(() => ({
    opacity: 1,
    transition: { duration: 0.3 }
  }), []);

  const imageTransition = useMemo(() => ({
    duration: 0.3,
    ease: "easeOut"
  }), []);

  return (
    <motion.div
      className="artwork-frame"
      variants={frameVariants}
      initial="initial"
      whileHover="hover"
      onClick={handleClick}
      layoutId={`artwork-${artwork.id}`}
      style={{
        animationDelay: `${index * 0.15}s`
      }}
      whileTap={tapVariant}
    >
      <div className="frame-border">
        <div className="frame-inner">
          <motion.div
            className="artwork-image"
            whileHover={imageHoverVariant}
            transition={imageTransition}
          >
            {isLoading && (
              <div className="image-loader">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="loader-container"
                >
                  <Loader className="loader-icon" />
                </motion.div>
              </div>
            )}

            <img
              src={artwork.thumbnail}
              alt={artwork.title}
              className={`artwork-image ${isLoading ? 'image-loading' : 'image-loaded'}`}
              onLoad={handleImageLoad}
              style={{ opacity: isLoading ? 0 : 1 }}
            />
          </motion.div>
          <motion.div 
            className="artwork-overlay"
            initial={{ opacity: 0 }}
            whileHover={overlayHoverVariant}
          >
            <Eye className="zoom-icon" />
          </motion.div>
        </div>
        
        <div className="artwork-info">
          <h3 className="artwork-title">{artwork.title}</h3>
          {/* <p className="artwork-technique">{artwork.technique}</p> */}
        </div>
      </div>
      
      <div className="frame-shadow"></div>
    </motion.div>
  );
});

ArtworkFrame.displayName = 'ArtworkFrame';

// Modal Image component with loading state
const ModalImage = React.memo(({ image, title, id }) => {
  const [isLoading, setIsLoading] = useState(true);
  
  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);
  
  return (
    <>
      {isLoading && (
        <div className="modal-loader">
          <motion.div
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { repeat: Infinity, duration: 2, ease: "linear" },
              scale: { repeat: Infinity, duration: 1.5, ease: "easeInOut" }
            }}
            className="modal-loader-container"
          >
            <Loader className="modal-loader-icon" />
          </motion.div>
        </div>
      )}
      <motion.img
        src={image}
        alt={title}
        className={`modal-image ${isLoading ? 'image-loading' : 'image-loaded'}`}
        loading="lazy"
        onLoad={handleImageLoad}
        animate={{ opacity: isLoading ? 0 : 1 }}
        transition={{ duration: 0.3 }}
        onError={(e) => {
          e.target.src = `https://picsum.photos/800/600?random=${id}`;
          setIsLoading(false);
        }}
      />
    </>
  );
});

ModalImage.displayName = 'ModalImage';

export default Gallery;

const courses = {
  upcoming: [
    {
      slug: "next-gen-chatbots",
      title: "Next-Gen Chatbots: Langchain, RAG & LLM's in action",
      desc: "HTML, CSS, JavaScript — build modern UI.",
      instructor: {
        name: "Raj Patel",
        bio: "Software Engineer",
        avatar: "/raj.png",
        linkedin: "https://www.linkedin.com/in/rajpatel2619/",
        portfolio: "https://www.codewithraj.com/",
      },
      level: "Intermediate",
      lessons: 20,
      price: 0,
      date: "to be announced",
      discountedPrice: 0,
      link: "", tags: ["AI", "New", "Intermediate"],
      whatYouWillLearn: [
        "Build beautiful web interfaces with HTML/CSS",
        "Understand JavaScript essentials",
        "Create responsive layouts and interactions",
      ],
      content: [
        {
          title: "Web Basics",
          topics: ["HTML Elements", "CSS Styling", "JavaScript Introduction"],
        },
        {
          title: "Responsive Design",
          topics: ["Media Queries", "Flexbox", "Grid Layouts"],
        },
        {
          title: "Building Web Pages",
          topics: ["Project Structure", "Reusable Components", "Deployment"],
        },
      ],
    },
    {
      slug: "introduction-to-llms",
      title: "Introduction to llms",
      desc: "HTML, CSS, JavaScript — build modern UI.",
      instructor: {
        name: "Arpit Anand",
        bio: "Software Engineer",
        avatar: "/raj.png",
        linkedin: "https://www.linkedin.com/in/rajpatel2619/",
        portfolio: "https://www.codewithraj.com/",
      },
      level: "Beginner",
      lessons: 30,
      price: 0,
      date: "to be announced",
      discountedPrice: 0,
      link: "", tags: ["AI", "New", "Beginner"],
      whatYouWillLearn: [
        "Build beautiful web interfaces with HTML/CSS",
        "Understand JavaScript essentials",
        "Create responsive layouts and interactions",
      ],
      content: [
        {
          title: "Web Basics",
          topics: ["HTML Elements", "CSS Styling", "JavaScript Introduction"],
        },
        {
          title: "Responsive Design",
          topics: ["Media Queries", "Flexbox", "Grid Layouts"],
        },
        {
          title: "Building Web Pages",
          topics: ["Project Structure", "Reusable Components", "Deployment"],
        },
      ],
    },
    {
      slug: "Binary-search",
      title: "Binary Search Bootcamp: Think in Log(N)",
      desc: "HTML, CSS, JavaScript — build modern UI.",
      instructor: {
        name: "Raj Patel",
        bio: "Software Engineer",
        avatar: "/raj.png",
        linkedin: "https://www.linkedin.com/in/rajpatel2619/",
        portfolio: "https://www.codewithraj.com/",
      },
      level: "Intermediate",
      lessons: 20,
      price: 0,
      date: "to be announced",
      discountedPrice: 0,
      link: "", tags: ["New", "Intermediate"],
      whatYouWillLearn: [
        "Build beautiful web interfaces with HTML/CSS",
        "Understand JavaScript essentials",
        "Create responsive layouts and interactions",
      ],
      content: [
        {
          title: "Web Basics",
          topics: ["HTML Elements", "CSS Styling", "JavaScript Introduction"],
        },
        {
          title: "Responsive Design",
          topics: ["Media Queries", "Flexbox", "Grid Layouts"],
        },
        {
          title: "Building Web Pages",
          topics: ["Project Structure", "Reusable Components", "Deployment"],
        },
      ],
    },
    {
      slug: "introduction-to-cpp-stl",
      title: "Introduction to Cpp STL: From Vector to Maps",
      desc: "HTML, CSS, JavaScript — build modern UI.",
      instructor: {
        name: "Yatindra Deo",
        bio: "Software Engineer",
        avatar: "/raj.png",
        linkedin: "https://www.linkedin.com/in/rajpatel2619/",
        portfolio: "https://www.codewithraj.com/",
      },
      level: "Intermediate",
      lessons: 20,
      price: 0,
      date: "to be announced",
      discountedPrice: 0,
      link: "", tags: ["New", "Intermediate"],
      whatYouWillLearn: [
        "Build beautiful web interfaces with HTML/CSS",
        "Understand JavaScript essentials",
        "Create responsive layouts and interactions",
      ],
      content: [
        {
          title: "Web Basics",
          topics: ["HTML", "tags", "CSS Styling", "JavaScript Introduction"],
        },
        {
          title: "Responsive Design",
          topics: ["Media Queries", "Flexbox", "Grid Layouts"],
        },
        {
          title: "Building Web Pages",
          topics: ["Project Structure", "Reusable Components", "Deployment"],
        },
      ],
    },
    {
      slug: "Backend-Edition",
      title: "Fullstack Web Dev Kickstart: Backend Edition",
      desc: "Kickstart your AI journey from zero to hero.",
      instructor: {
        name: "Raj Patel",
        bio: "IIT Patna",
        avatar: "/raj.png",
      },
      level: "Intermediate",
      lessons: 50,
      price: 0,
      date: "to be announced",
      discountedPrice: 0,
      link: "", tags: ["Backend", "New", "Intermediate"],
      whatYouWillLearn: [
        "Understand the basics of AI and machine learning",
        "Build simple AI models using Python",
        "Differentiate between supervised and unsupervised learning",
      ],
      content: [
        {
          title: "Introduction to Artificial Intelligence",
          topics: ["History of AI", "What is AI?", "Applications of AI"],
        },
        {
          title: "Fundamentals of Machine Learning",
          topics: [
            "Supervised Learning",
            "Unsupervised Learning",
            "Reinforcement Learning",
          ],
        },
        {
          title: "Building Your First AI Model",
          topics: [
            "Python for AI",
            "Training a classifier",
            "Evaluating performance",
          ],
        },
      ],
    },
    {
      slug: "figma-and-tools",
      title: "UI/UX design: figma & tools",
      desc: "HTML, CSS, JavaScript — build modern UI.",
      instructor: {
        name: "M A Karimi",
        bio: "Mtech @ IIT Patna",
        avatar: "/mak.jpg",
      },
      level: "Beginner",
      lessons: 40,
      price: 0,
      date: "to be announced",
      discountedPrice: 0,
      link: "", tags: ["UI/UX", "New"],
      whatYouWillLearn: [
        "Build beautiful web interfaces with HTML/CSS",
        "Understand JavaScript essentials",
        "Create responsive layouts and interactions",
      ],
      content: [
        {
          title: "Web Basics",
          topics: ["HTML Elements", "CSS Styling", "JavaScript Introduction"],
        },
        {
          title: "Responsive Design",
          topics: ["Media Queries", "Flexbox", "Grid Layouts"],
        },
        {
          title: "Building Web Pages",
          topics: ["Project Structure", "Reusable Components", "Deployment"],
        },
      ],
    },
  ],
  ongoing: [  
    {
      "slug": "python-foundations-ml-dl",
      "title": "Python Programming & AI Foundations: From Zero to Hero",
      "desc": "Start your journey in software and AI development by mastering Python — from core syntax to advanced data science, machine learning, deep learning, and generative AI. This bootcamp takes you from beginner-level coding all the way to real-world AI projects with Hugging Face Transformers and OpenAI tools for NLP, vision, and deployment.",
      "instructor": [
        {
          "name": "Raj Patel",
          "bio": "Software Engineer",
          "avatar": "/raj.png",
          "linkedin": "https://www.linkedin.com/in/rajpatel2619/",
          "portfolio": ""
        },
        {
          "name": "Arpit Anand",
          "bio": "MTech @IIT Patna",
          "avatar": "/man.png",
          "linkedin": "/temp_courses/python-foundations-ml-dl",
          "portfolio": "https://www.codewithraj.com/"
        }
      ],
      "level": "Beginner to Advanced",
      "lessons": 120,
      "price": 6999,
      "discountedPrice": 2999,
      "date": "Starting from 15th July",
      "link": "https://forms.gle/python-course-link",
      "tags": ["Python", "Machine Learning", "Deep Learning", "Hugging Face", "OpenAI", "AI Tools", "Paid"],
      "whatYouWillLearn": [
        "Master Python syntax and programming logic",
        "Work with real-world data using Pandas, NumPy, and Matplotlib",
        "Build ML models using scikit-learn",
        "Create deep learning models using TensorFlow and PyTorch",
        "Use Hugging Face Transformers for NLP and CV tasks",
        "Integrate OpenAI tools like GPT-4, Whisper, and DALL·E into apps",
        "Build and deploy AI-powered applications with Streamlit and FastAPI"
      ],
      "content": [
        {
          "title": "Phase 1: Python Foundations",
          "topics": [
            "Installing Python, IDEs, and Jupyter Notebooks",
            "Basic Syntax, Variables, and Data Types",
            "Operators and Expressions",
            "Conditional Statements (if/elif/else)",
            "Loops (for, while), Break and Continue",
            "Functions, Return Values, *args/**kwargs",
            "Lambda Functions, Map/Filter/Reduce",
            "Modules and Packages",
            "Object-Oriented Programming (Classes, Objects, Inheritance)",
            "File Handling: Text, CSV, JSON",
            "Exception Handling and Custom Errors",
            "Decorators, Iterators, and Generators",
            "Regular Expressions and DateTime Module"
          ]
        },
        {
          "title": "Phase 2: Data Analysis & Visualization",
          "topics": [
            "NumPy Arrays, Indexing, Broadcasting",
            "Mathematical and Logical Operations",
            "Pandas: Series and DataFrames",
            "Reading and Writing CSV, Excel, JSON files",
            "Handling Missing Data and Duplicates",
            "Sorting, Filtering, and GroupBy Operations",
            "Aggregation and Pivot Tables",
            "Merging and Joining DataFrames",
            "Exploratory Data Analysis (EDA) Techniques",
            "Matplotlib: Line, Bar, Histogram, Scatter, Pie Charts",
            "Seaborn: Heatmaps, Pairplots, Distribution Plots",
            "Visual Storytelling and Dashboard-style Layouts"
          ]
        },
        {
          "title": "Phase 3: Machine Learning with Scikit-learn",
          "topics": [
            "What is Machine Learning? Types and Workflow",
            "Train/Test Split and Cross Validation",
            "Preprocessing: Scaling, Encoding, Imputation",
            "Feature Selection and Engineering",
            "Linear Regression and Polynomial Regression",
            "Logistic Regression for Binary Classification",
            "K-Nearest Neighbors (KNN)",
            "Naive Bayes and Probabilistic Models",
            "Decision Trees and Random Forests",
            "Support Vector Machines (SVM)",
            "Unsupervised Learning: K-Means, DBSCAN",
            "Dimensionality Reduction: PCA and t-SNE",
            "Model Evaluation: Accuracy, Precision, Recall, F1",
            "Confusion Matrix, ROC Curve, AUC Score",
            "Hyperparameter Tuning with GridSearchCV"
          ]
        },
        {
          "title": "Phase 4: Deep Learning with TensorFlow & PyTorch",
          "topics": [
            "Neural Network Basics: Architecture and Layers",
            "TensorFlow 2.x: Tensors, Keras Layers",
            "Model Compilation, Training, Evaluation",
            "Callbacks: EarlyStopping and Checkpoints",
            "Custom Datasets and Dataloaders in PyTorch",
            "CNNs: Conv2D, Pooling, Flatten, Dense",
            "RNNs, LSTM, GRU for Sequence Modeling",
            "Embedding Layers and Word Vectors",
            "Transfer Learning with ResNet, MobileNet",
            "TensorBoard and PyTorch Profiler",
            "Model Saving, Loading, and Conversion"
          ]
        },
        {
          "title": "Phase 5: NLP, Computer Vision & Generative AI",
          "topics": [
            "Text Preprocessing: Tokenization, Stopwords, Lemmatization",
            "TF-IDF, Word2Vec, and FastText embeddings",
            "Text Classification using sklearn and Keras",
            "Named Entity Recognition using SpaCy",
            "Image Classification with CNN (Cats vs Dogs)",
            "Object Detection Concepts (YOLO, SSD)",
            "Intro to Hugging Face Transformers",
            "Using BERT and DistilBERT for Sentiment Analysis",
            "Fine-tuning BERT for Text Classification",
            "Image Captioning with BLIP and CLIP",
            "Intro to OpenAI GPT-3.5/GPT-4 APIs",
            "Building a Chatbot with GPT and LangChain",
            "DALL·E API for Image Generation from Text",
            "Whisper for Audio Transcription and Voice AI",
            "Video Generation & Editing with Hugging Face tools (Zeroth, Sora, Modelscope)"
          ]
        },
        {
          "title": "Phase 6: Real-World Projects",
          "topics": [
            "House Price Prediction (Regression Model)",
            "Customer Churn Prediction (Classification Model)",
            "Text Sentiment Analyzer (Hugging Face + Streamlit)",
            "Resume Parser (NLP + PDF Processing)",
            "Fake News Detector with BERT",
            "Handwritten Digit Recognition (MNIST)",
            "Face Mask Detector (OpenCV + TensorFlow)",
            "Stock Price Forecasting with LSTM",
            "AI Image Generator (DALL·E API + Gradio UI)",
            "Voice-to-Text App using Whisper + Streamlit"
          ]
        },
        {
          "title": "Phase 7: Model Deployment & Portfolio Building",
          "topics": [
            "Streamlit Apps for ML/DL Deployment",
            "Building Fast APIs using FastAPI and Uvicorn",
            "Deploying Apps to Hugging Face Spaces (Gradio/Streamlit)",
            "Using Docker to Containerize ML Models",
            "GitHub Pages for Project Portfolio Hosting",
            "CI/CD for ML with GitHub Actions",
            "Using OpenAI + LangChain for Multi-Model Apps",
            "Secure API Keys and Environment Variables",
            "Resume Review and LinkedIn Optimization",
            "Writing Blogs about Projects (Medium, Hashnode)",
            "Portfolio Website using React or Flask"
          ]
        }
      ]
    }
    ,
    {
      slug: "code-essentials-dsa",
      title: "Code Essentials: A Beginner's Guide to DSA",
      desc: "Master the core concepts of data structures and algorithms with practical coding techniques, tailored for beginners. This course is designed to help you build a solid foundation in computational thinking and problem-solving from the ground up. You'll learn how to approach complex challenges efficiently using industry-standard methods, making you interview-ready and confident in any coding environment. Whether you're preparing for tech interviews or strengthening your programming fundamentals, this course breaks down key DSA topics into beginner-friendly lessons, exercises, and real-world examples.",
      instructor: [{
        name: "Raj Patel",
        bio: "Software Engineer",
        avatar: "/raj.png",
        linkedin: "https://www.linkedin.com/in/rajpatel2619/",
        portfolio: "https://www.codewithraj.com/",
      },
      {
        name: "Yatindra Deo",
        bio: "MTech @IIT Patna",
        avatar: "/man.png",
        linkedin: "/temp_courses/code-essentials-dsa",
        portfolio: "https://www.codewithraj.com/",
      }],
      level: "Beginner",
      lessons: 80,
      price: 4999,
      date: "Starting from 25th July",
      discountedPrice: 2499,
      link: "https://forms.gle/uwrTJtTb8JYgsAcB9",
      tags: ["Beginner", "Bestseller", "Paid"],
      whatYouWillLearn: [
        "Understand core data structures like arrays, linked lists, and trees",
        "Learn algorithmic thinking with sorting, searching, and recursion",
        "Improve coding problem-solving skills with real-world challenges",
      ],
      content: [
        {
          title: "Arrays & Hashing",
          topics: [
            "Introduction to Arrays",
            "Hash Maps & Sets",
            "Frequency Counters",
            "Common Interview Patterns",
          ],
        },
        {
          title: "Two Pointers",
          topics: [
            "Left and Right Pointer Strategy",
            "Sorting and Two Pointers",
            "Collision and Sliding Techniques",
          ],
        },
        {
          title: "Stack",
          topics: [
            "Stack Basics and Use Cases",
            "Monotonic Stack",
            "Valid Parentheses & Expression Evaluation",
          ],
        },
        {
          title: "Binary Search",
          topics: [
            "Binary Search on Arrays",
            "Search on Answer Problems",
            "Binary Search on Infinite Data",
          ],
        },
        {
          title: "Sliding Window",
          topics: [
            "Fixed-size Sliding Window",
            "Dynamic Sliding Window",
            "Longest Substring Patterns",
          ],
        },
        {
          title: "Linked List Tasks",
          topics: [
            "Singly and Doubly Linked List",
            "Fast & Slow Pointer Pattern",
            "Cycle Detection and Reversal",
          ],
        },
        {
          title: "Trees",
          topics: [
            "Tree Traversals",
            "DFS and BFS",
            "Binary Search Tree (BST)",
            "Tree Recursion Patterns",
          ],
        },
        {
          title: "Backtracking",
          topics: [
            "Subset Generation",
            "Permutations and Combinations",
            "Sudoku Solver",
            "N-Queens Problem",
          ],
        },
        {
          title: "Heap / Priority Queue",
          topics: [
            "Heap Basics",
            "Min/Max Heaps",
            "Top K Elements",
            "Heap-Based Scheduling",
          ],
        },
        {
          title: "Graphs",
          topics: [
            "Graph Representations",
            "DFS and BFS in Graphs",
            "Cycle Detection",
            "Shortest Path Algorithms",
          ],
        },
        {
          title: "1-D DP",
          topics: [
            "Fibonacci Pattern",
            "House Robber",
            "Climbing Stairs",
            "Optimizing DP with Memoization",
          ],
        },
        {
          title: "Intervals",
          topics: [
            "Merge Intervals",
            "Insert Interval",
            "Interval Overlap Problems",
          ],
        },
        {
          title: "Greedy",
          topics: [
            "Greedy Strategy Basics",
            "Activity Selection",
            "Fractional Knapsack",
            "Greedy vs DP Analysis",
          ],
        },
        {
          title: "Advanced Graphs",
          topics: [
            "Dijkstra’s Algorithm",
            "Topological Sort",
            "Union-Find & Disjoint Set",
            "Kruskal & Prim’s MST",
          ],
        },
        {
          title: "Tries",
          topics: [
            "Prefix Tree Basics",
            "Insert & Search Operations",
            "Word Search II",
            "Autocomplete Systems",
          ],
        },
        {
          title: "2-D DP",
          topics: [
            "Grid-Based DP",
            "Longest Common Subsequence",
            "Edit Distance",
            "Knapsack 2D Variants",
          ],
        },
        {
          title: "Bit Manipulation",
          topics: [
            "Bitwise Operations",
            "Set, Clear, Toggle Bits",
            "Single Number Problems",
            "Bitmasking in Subsets",
          ],
        },
        {
          title: "Math & Geometry",
          topics: [
            "GCD, LCM, and Primes",
            "Coordinate Geometry Basics",
            "Math Patterns in Coding",
            "Number Theory Tricks",
          ],
        },
      ],
    },
    
    {
      "slug": "hugging-face-bootcamp",
      "title": "Hugging Face Masterclass: From NLP to Generative AI",
      "desc": "Dive into the future of AI with this immersive Hugging Face bootcamp. From Natural Language Processing (NLP) to cutting-edge generative models for text, images, and videos, you'll master the tools behind state-of-the-art Transformers. Learn to build and deploy real-world AI applications using Hugging Face Transformers, Datasets, Diffusers, and the Hub. Perfect for aspiring ML engineers, data scientists, and AI enthusiasts.",
      "instructor": [
        {
          "name": "Raj Patel",
          "bio": "AI Engineer & Educator",
          "avatar": "/raj.png",
          "linkedin": "https://www.linkedin.com/in/rajpatel2619/",
          "portfolio": "https://www.codewithraj.com/"
        }
      ],
      "level": "Beginner to Intermediate",
      "lessons": 8,
      "price": 1999,
      "date": "Starting from 10th July",
      "discountedPrice": "Free",
      "link": "https://forms.gle/bNXXEcQJJJFgL5bQ8",
      "tags": ["NLP", "Generative AI", "Diffusion Models", "Transformers", "Free"],
      "whatYouWillLearn": [
        "Understand how Transformers power modern NLP and AI applications",
        "Use Hugging Face Transformers for text, image, and video tasks",
        "Fine-tune models for sentiment analysis, summarization, and translation",
        "Generate images using Stable Diffusion and Diffusers",
        "Build video generation and editing pipelines with multimodal models",
        "Deploy AI applications using Hugging Face Spaces and Gradio"
      ],
      "content": [
        {
          "title": "Foundations of Hugging Face & Transformers",
          "topics": [
            "Introduction to Hugging Face ecosystem",
            "Tokenizers, Models, and Pipelines",
            "Transformers architecture overview",
            "Using Hugging Face Hub and Spaces",
            "Installing 🤗 Transformers and 🤗 Datasets"
          ]
        },
        {
          "title": "Text Understanding & Generation with Transformers",
          "topics": [
            "Text classification with BERT and RoBERTa",
            "Named Entity Recognition and Question Answering",
            "Text generation with GPT-2, GPT-Neo, and LLaMA",
            "Summarization with BART and T5",
            "Prompt engineering basics"
          ]
        },
        {
          "title": "Multilingual NLP and Translation",
          "topics": [
            "Using mBART and MarianMT for translation",
            "Zero-shot classification with XLM-R",
            "Fine-tuning multilingual models",
            "Evaluation: BLEU, ROUGE, and METEOR scores"
          ]
        },
        {
          "title": "Vision Transformers and Image Tasks",
          "topics": [
            "Image classification with ViT and ConvNeXT",
            "Object detection with DETR",
            "CLIP for vision-language tasks",
            "Image captioning with BLIP and Flamingo",
            "Training custom vision models using Hugging Face datasets"
          ]
        },
        {
          "title": "Image Generation with Stable Diffusion",
          "topics": [
            "Intro to Diffusers library",
            "Generating images from prompts with Stable Diffusion",
            "Inpainting, outpainting, and image editing",
            "Customizing generation with controlnet and LoRA",
            "Deploying diffusion models with Gradio"
          ]
        },
        {
          "title": "Video Generation & Editing with Transformers",
          "topics": [
            "Overview of video generation models (ModelScope, CogVideo)",
            "Text-to-video generation using Hugging Face interfaces",
            "Video editing using ControlNet + Stable Diffusion",
            "Combining vision and motion features",
            "Best practices for GPU resource optimization"
          ]
        },
        {
          "title": "Building and Deploying AI Apps",
          "topics": [
            "Creating AI apps with Gradio",
            "Hosting models on Hugging Face Spaces",
            "Sharing datasets and model cards",
            "Using inference endpoints and APIs",
            "CI/CD for machine learning models"
          ]
        },
        {
          "title": "Capstone Projects & Career Guidance",
          "topics": [
            "Build an end-to-end NLP or image generation app",
            "Publish your project on Hugging Face Hub",
            "Best practices for building a portfolio",
            "AI job market: roles, skills, and roadmaps",
            "How to contribute to open-source ML"
          ]
        }
      ]
    },    
    {
      slug: "frontend-bootcamp",
      title: "Building the Modern Web: Frontend Bootcamp",
      desc: "Dive into the world of modern web development with this hands-on frontend bootcamp. From mastering HTML and CSS to building dynamic, responsive interfaces with JavaScript and React, you'll gain the skills needed to craft professional-grade websites and web apps. Whether you're a beginner or brushing up on the latest tech, this course covers essential tools, frameworks, and best practices to help you build fast, accessible, and visually stunning web experiences.",
      instructor: [
        {
          name: "M A Karimi",
          bio: "Mtech @ IIT Patna",
          avatar: "/mak.jpg",
          linkedin: "https://www.linkedin.com/in/makarimi01/",
          portfolio: "https://muzammilkarimi.github.io/",
        },
        {
          name: "Raj Patel",
          bio: "Software Engineer",
          avatar: "/raj.png",
          linkedin: "https://www.linkedin.com/in/rajpatel2619/",
          portfolio: "https://www.codewithraj.com/",
        },
      ],
      level: "Beginner",
      lessons: 60,
      price: 3999,
      date: "Starting from 2nd August",
      discountedPrice: 1999,
      link: "https://forms.gle/bNXXEcQJJJFgL5bQ8",
      tags: ["Frontend", "Beginner", "Paid"],
      whatYouWillLearn: [
        "Build responsive websites using HTML5 and CSS3",
        "Create dynamic user interfaces with JavaScript and React",
        "Implement modern design practices like Flexbox and CSS Grid",
        "Use version control with Git and GitHub",
        "Optimize web performance and accessibility",
        "Deploy frontend projects using platforms like Vercel or Netlify",
      ],

      content: [
        {
          title: "Introduction to Web Development",
          topics: [
            "What is Web Development?",
            "Frontend vs Backend vs Fullstack",
            "How the Web Works (Client-Server Model)",
            "Understanding HTTP and Browsers",
            "Basic Tools: Code Editors, Browsers, Terminals",
            "Setting Up Your Development Environment",
            "Introduction to HTML, CSS, and JavaScript",
            "Using the DevTools in Chrome/Firefox",
            "What is a Code Repository? (Git & GitHub Overview)",
            "Creating Your First Web Page",
          ],
        },
        {
          title: "HTML Foundations",
          topics: [
            "Semantic HTML Elements",
            "Forms and Input Types",
            "Form Accessibility",
            "Media Elements (audio, video)",
            "SEO-Friendly HTML Structure",
          ],
        },
        {
          title: "CSS Fundamentals",
          topics: [
            "CSS Selectors & Specificity",
            "Box Model & Positioning",
            "Flexbox & Grid",
            "Responsive Design with Media Queries",
            "Transitions and Animations",
          ],
        },
        {
          title: "Version Control with Git",
          topics: [
            "Git Basics (init, commit, push)",
            "Branching & Merging",
            "Working with GitHub",
            "Pull Requests & Code Reviews",
            "Handling Merge Conflicts",
          ],
        },
        {
          title: "Modern JavaScript",
          topics: [
            "ES6+ Syntax & Features",
            "DOM Manipulation",
            "Event Listeners & Bubbling",
            "Async JavaScript (Promises, Fetch, Async/Await)",
            "Modules & Tooling",
          ],
        },
        {
          title: "JavaScript Deep Dive",
          topics: [
            "Closures & Scope",
            "Hoisting & Execution Context",
            "Array Methods (map, filter, reduce)",
            "Object Manipulation",
            "Error Handling & Debugging",
          ],
        },
        {
          title: "React Basics",
          topics: [
            "JSX Syntax & Rules",
            "Functional Components",
            "Props and State",
            "Event Handling",
            "Component Communication",
          ],
        },
        {
          title: "React Advanced Concepts",
          topics: [
            "React Hooks (useState, useEffect, useRef)",
            "Custom Hooks",
            "Context API for State Management",
            "Error Boundaries",
            "React Performance Tips",
          ],
        },
        {
          title: "Routing in React",
          topics: [
            "React Router Setup",
            "Dynamic Routing & Params",
            "Nested Routes",
            "Navigation & Link Handling",
            "Protected Routes",
          ],
        },
        {
          title: "Styling in React",
          topics: [
            "CSS Modules",
            "Styled-Components",
            "Tailwind CSS Setup",
            "Responsive Design with Tailwind",
            "Theming and Dark Mode",
          ],
        },
        {
          title: "Animation & Interaction",
          topics: [
            "Framer Motion Basics",
            "AnimatePresence & Transitions",
            "Gestures and Dragging",
            "Scroll Animations",
            "Creating Interactive UI Patterns",
          ],
        },
        {
          title: "API Integration",
          topics: [
            "REST APIs & Fetch",
            "Using Axios",
            "Handling API Errors",
            "Loading and Empty States",
            "Custom Hooks for API Calls",
          ],
        },
        {
          title: "Testing & Debugging",
          topics: [
            "Unit Testing with Jest",
            "Component Testing with React Testing Library",
            "Debugging in DevTools",
            "Writing Testable Code",
            "Test Coverage & Mocking APIs",
          ],
        },
        {
          title: "Deploying & Optimizing Apps",
          topics: [
            "Building for Production",
            "Optimizing Assets & Code Splitting",
            "Deploying to Vercel/Netlify",
            "Using Environment Variables",
            "Performance Analysis with Lighthouse",
          ],
        },
      ],
    },
  ],
  completed: [
    {
      slug: "intro-to-web-dev",
      title: "Intro to Web Dev",
      desc: "HTML, CSS, JavaScript from scratch.",
      instructor: {
        name: "M A Karimi",
        bio: "Mtech @ IIT Patna",
        avatar: "/mak.jpg",
      },
      level: "Beginner",
      lessons: 30,
      price: 2499,
      date: "Expired",
      discountedPrice: 1499,
      link: "", 
      tags: ["Frontend", "Free"],
      whatYouWillLearn: [
        "Build static websites using HTML & CSS",
        "Understand JavaScript basics",
        "Host your site on the internet",
      ],
      content: [
        {
          title: "HTML Essentials",
          topics: ["Structure", "Forms", "Tables"],
        },
        {
          title: "CSS Styling",
          topics: ["Selectors", "Box Model", "Responsive Design"],
        },
        {
          title: "JavaScript 101",
          topics: ["Variables", "DOM Manipulation", "Events"],
        },
      ],
    },
    {
      slug: "algorithms-data-structures",
      title: "Algorithms & Data Structures",
      desc: "Ace your coding interviews.",
      instructor: {
        name: "Raj Patel",
        bio: "Co-author of the most well-known DSA textbooks. Expert in computational thinking.",
        avatar: "/raj.png",
      },
      level: "Advanced",
      lessons: 38,
      price: 4999,
      date: "Expired",
      discountedPrice: 3999,
      link: "", 
      tags: ["Bestseller", "Advanced"],
      whatYouWillLearn: [
        "Master common data structures and their applications",
        "Implement sorting and searching algorithms",
        "Solve real-world problems with confidence",
      ],
      content: [
        {
          title: "Foundations",
          topics: ["Arrays", "Linked Lists", "Stacks & Queues"],
        },
        {
          title: "Algorithms",
          topics: ["Sorting", "Searching", "Recursion"],
        },
        {
          title: "Advanced Topics",
          topics: ["Graphs", "Dynamic Programming", "Greedy Techniques"],
        },
      ],
    },
  ],
};

export default courses;

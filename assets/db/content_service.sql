-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Aug 19, 2025 at 12:25 PM
-- Server version: 11.8.2-MariaDB-ubu2404
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `skillshare_academy_learning`
--

-- --------------------------------------------------------

--
-- Table structure for table `chapters`
--

CREATE TABLE `chapters` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `course_id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `credits` int(11) NOT NULL DEFAULT 3,
  `order_index` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `chapters`
--

INSERT INTO `chapters` (`id`, `course_id`, `title`, `description`, `credits`, `order_index`) VALUES
(1, 1, 'HTML Structure and Semantics', 'Learn proper HTML document structure and semantic elements', 4, 1),
(2, 1, 'CSS Styling and Layout', 'Master CSS selectors, properties, and layout techniques', 4, 2),
(3, 1, 'JavaScript Basics', 'Variables, functions, and control structures in JavaScript', 5, 3),
(4, 1, 'DOM Manipulation', 'Interact with HTML elements using JavaScript', 4, 4),
(5, 1, 'Responsive Design', 'Create websites that work on all device sizes', 5, 5),
(6, 1, 'Web Forms and Validation', 'Build interactive forms with proper validation', 4, 6),
(7, 2, 'React Hooks Deep Dive', 'useState, useEffect, and custom hooks mastery', 5, 1),
(8, 2, 'Context API and State Management', 'Global state management without Redux', 5, 2),
(9, 2, 'Performance Optimization', 'React.memo, useMemo, and useCallback techniques', 5, 3),
(10, 2, 'Advanced Component Patterns', 'Render props, HOCs, and compound components', 5, 4),
(11, 2, 'Testing React Applications', 'Unit and integration testing with Jest and RTL', 4, 5),
(12, 3, 'Python Syntax and Variables', 'Basic Python syntax, data types, and variables', 3, 1),
(13, 3, 'Control Flow and Functions', 'Loops, conditionals, and function definitions', 4, 2),
(14, 3, 'Data Structures in Python', 'Lists, dictionaries, sets, and tuples', 4, 3),
(15, 3, 'File I/O and Exception Handling', 'Working with files and handling errors gracefully', 4, 4),
(16, 3, 'Object-Oriented Programming', 'Classes, objects, and inheritance in Python', 5, 5),
(17, 4, 'Database Fundamentals', 'RDBMS concepts, normalization, and ER diagrams', 4, 1),
(18, 4, 'Basic SQL Queries', 'SELECT, WHERE, ORDER BY, and basic joins', 4, 2),
(19, 4, 'Advanced SQL Operations', 'Subqueries, window functions, and complex joins', 5, 3),
(20, 4, 'Database Design Patterns', 'Schema design best practices and optimization', 5, 4),
(21, 5, 'Node.js Fundamentals', 'Event loop, modules, and npm package management', 4, 1),
(22, 5, 'Express.js Framework', 'Building web servers and REST APIs with Express', 5, 2),
(23, 5, 'Database Integration', 'Connecting to databases and ORM usage', 4, 3),
(24, 5, 'Authentication and Security', 'JWT tokens, password hashing, and security best practices', 5, 4),
(25, 5, 'API Testing and Documentation', 'Testing APIs and creating comprehensive documentation', 4, 5),
(26, 6, 'Design Thinking Process', 'User research, personas, and problem definition', 4, 1),
(27, 6, 'Visual Design Principles', 'Color theory, typography, and layout composition', 4, 2),
(28, 6, 'Wireframing and Prototyping', 'Creating low and high-fidelity prototypes', 4, 3),
(29, 6, 'Usability Testing', 'User testing methods and feedback implementation', 3, 4),
(30, 6, 'Accessibility in Design', 'Creating inclusive designs for all users', 4, 5),
(31, 7, 'CI/CD Pipeline Setup', 'Continuous integration and deployment workflows', 5, 1),
(32, 7, 'Container Orchestration', 'Kubernetes basics and container management', 5, 2),
(33, 7, 'Infrastructure as Code', 'Terraform and infrastructure automation', 5, 3),
(34, 7, 'Monitoring and Logging', 'Application monitoring and log management', 4, 4),
(35, 8, 'React Native Fundamentals', 'Mobile development with React Native', 5, 1),
(36, 8, 'Navigation and State', 'App navigation and state management patterns', 4, 2),
(37, 8, 'Native Device Features', 'Camera, GPS, and device API integration', 5, 3),
(38, 8, 'App Store Deployment', 'Publishing to iOS and Android app stores', 4, 4),
(39, 9, 'ML Algorithms Overview', 'Supervised, unsupervised, and reinforcement learning', 5, 1),
(40, 9, 'Data Preprocessing', 'Data cleaning, feature engineering, and normalization', 4, 2),
(41, 9, 'Model Training and Evaluation', 'Training ML models and performance metrics', 5, 3),
(42, 9, 'Practical ML Projects', 'Real-world machine learning implementations', 5, 4);

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `difficulty` enum('beginner','intermediate','advanced') NOT NULL DEFAULT 'beginner',
  `total_chapters` int(11) NOT NULL DEFAULT 0,
  `total_credits` int(11) NOT NULL DEFAULT 0,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `description`, `difficulty`, `total_chapters`, `total_credits`, `created_at`) VALUES
(1, 'Web Development Fundamentals', 'Learn the basics of HTML, CSS, and JavaScript for modern web development', 'beginner', 6, 26, '2024-12-31 23:00:00.000'),
(2, 'Advanced React Development', 'Master React hooks, context, and advanced patterns for scalable applications', 'advanced', 5, 24, '2024-12-31 23:00:00.000'),
(3, 'Introduction to Python', 'Start your programming journey with Python basics and practical applications', 'beginner', 5, 20, '2024-12-31 23:00:00.000'),
(4, 'Database Design & SQL', 'Learn relational database concepts and SQL querying techniques', 'intermediate', 4, 18, '2024-12-31 23:00:00.000'),
(5, 'Node.js Backend Development', 'Build scalable server-side applications with Node.js and Express', 'intermediate', 5, 22, '2024-12-31 23:00:00.000'),
(6, 'UI/UX Design Principles', 'Master the fundamentals of user interface and user experience design', 'beginner', 5, 19, '2024-12-31 23:00:00.000'),
(7, 'DevOps and Deployment', 'Learn continuous integration, deployment, and infrastructure management', 'advanced', 4, 19, '2024-12-31 23:00:00.000'),
(8, 'Mobile App Development', 'Create cross-platform mobile applications using React Native', 'intermediate', 4, 18, '2024-12-31 23:00:00.000'),
(9, 'Machine Learning Basics', 'Introduction to ML concepts, algorithms, and practical implementations', 'intermediate', 4, 19, '2024-12-31 23:00:00.000'),
(10, 'Cybersecurity Fundamentals', 'Essential security concepts and practices for modern applications', 'intermediate', 0, 0, '2024-12-31 23:00:00.000'),
(11, 'Cloud Computing with AWS', 'Learn Amazon Web Services and cloud architecture patterns', 'advanced', 0, 0, '2024-12-31 23:00:00.000'),
(12, 'JavaScript ES6+ Features', 'Modern JavaScript features and best practices for clean code', 'intermediate', 0, 0, '2024-12-31 23:00:00.000'),
(13, 'Docker and Containerization', 'Master containerization with Docker and orchestration basics', 'intermediate', 0, 0, '2024-12-31 23:00:00.000'),
(14, 'Git Version Control', 'Essential Git commands and workflow strategies for team collaboration', 'beginner', 0, 0, '2024-12-31 23:00:00.000'),
(15, 'API Design and Development', 'Best practices for designing and building RESTful APIs', 'intermediate', 0, 0, '2024-12-31 23:00:00.000'),
(16, 'Frontend Testing Strategies', 'Unit testing, integration testing, and e2e testing for web apps', 'advanced', 0, 0, '2024-12-31 23:00:00.000'),
(17, 'Agile Project Management', 'Scrum, Kanban, and agile methodologies for software development', 'beginner', 0, 0, '2024-12-31 23:00:00.000'),
(18, 'Data Structures & Algorithms', 'Essential CS concepts for technical interviews and problem solving', 'intermediate', 0, 0, '2024-12-31 23:00:00.000');

-- --------------------------------------------------------

--
-- Table structure for table `_prisma_migrations`
--

CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) NOT NULL,
  `checksum` varchar(64) NOT NULL,
  `finished_at` datetime(3) DEFAULT NULL,
  `migration_name` varchar(255) NOT NULL,
  `logs` text DEFAULT NULL,
  `rolled_back_at` datetime(3) DEFAULT NULL,
  `started_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `applied_steps_count` int(10) UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `_prisma_migrations`
--

INSERT INTO `_prisma_migrations` (`id`, `checksum`, `finished_at`, `migration_name`, `logs`, `rolled_back_at`, `started_at`, `applied_steps_count`) VALUES
('2ef4af72-3c19-43d3-9f0c-5bc2c7af634f', '47fa2d6345196b64dd418d6da0664dec503ff144015bb10990588673895ecc3a', '2025-08-17 09:31:34.664', '20250816132700_init', NULL, NULL, '2025-08-17 09:31:34.598', 1),
('60a40e95-718d-4b79-9f24-f90c95763ce1', '1e5dc0f785ffa01b656379992720dc14f3c44ce756d375d88822d6d3510f0efd', '2025-08-17 09:31:34.597', '20250816120635_init', NULL, NULL, '2025-08-17 09:31:34.438', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chapters`
--
ALTER TABLE `chapters`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chapters_course_id_order_index_idx` (`course_id`,`order_index`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `courses_difficulty_idx` (`difficulty`);

--
-- Indexes for table `_prisma_migrations`
--
ALTER TABLE `_prisma_migrations`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chapters`
--
ALTER TABLE `chapters`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chapters`
--
ALTER TABLE `chapters`
  ADD CONSTRAINT `chapters_course_id_fkey` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
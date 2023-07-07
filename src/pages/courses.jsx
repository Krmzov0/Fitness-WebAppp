'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '@/components/Header';
import { ArrowLeft } from 'iconsax-react';

const Courses = () => {
  const router = useRouter();
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const collectionRef = collection(db, 'courses');
        const querySnapshot = await getDocs(collectionRef);
        const coursesData = [];

        querySnapshot.forEach((doc) => {
          const course = {
            id: doc.id,
            name: doc.data().name,
            courseName: doc.data().course_name, // Fetching the "course_name" field from the document
          };
          coursesData.push(course);
        });

        setCourses(coursesData);
      } catch (error) {
        console.log('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleCourseClick = (courseId) => {
    router.push(`/courses/${courseId}`);
  };

  return (
    <div className="flex flex-col text-white h-screen">
      <Header />
      <div className="relative top-32 px-10">
        <div className='flex items-center gap-x-6'>
          <div className='backArrow relative trasition-all' onClick={() => router.push('/')}>
            <ArrowLeft variant='Broken' className='top-[1px] relative cursor-pointer' size={32} color='#fff' />
          </div>
          <h1 className='text-4xl cubano'>Courses</h1>
        </div>
        <div className="flex gap-x-3 mt-3 text-lg">
          {courses.map((course) => (
            <button
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
            >
              {course.courseName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;

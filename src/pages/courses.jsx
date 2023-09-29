'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import Header from '../components/Header';

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

  return (
    <div className="flex flex-col text-white h-screen">
      <Header />
      <div className="relative top-32 px-10">
        <div className='flex items-center gap-x-6'>
          <h1 className='text-4xl cubano'>Courses</h1>
        </div>
        <div className="flex gap-x-3 mt-3 text-lg">
          {courses.map((course) => (
            <div
              key={course.id}exit
            >
              <button onClick={() => router.push('/courses/muscle-gain')} className='mr-4'>{course.courseName}</button>
            </div>
          ))}
        </div>

        <div className='flex flex-col w-max'>
          <button onClick={() => router.push('/courses/muscle-gain')}>Muscle Gain Course</button>
          <button onClick={() => router.push('/courses/fat-loss')}>Fat Loss Course</button>
        </div>
      </div>
    </div>
  );
};

export default Courses;

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase'; // Assuming you have imported the db object from your Firebase config file
import Header from '@/components/Header';

const fatLoss = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCourseData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'fatLoss'));

        const courses = [];
        querySnapshot.forEach((doc) => {
          const course = {
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
          };
          courses.push(course);
        });

        setCourseData(courses);
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    fetchCourseData();
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleBuyNow = async () => {
    if (!user) {
      router.push('/login');
    } else {
      window.location.href = 'https://buy.stripe.com/test_5kA4hLco0dhEgb6eUV';
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (courseData.length === 0) {
    return <div>No courses found</div>;
  }

  return (
    <div className='text-white regular'>
      <Header />

      <div className='relative top-32 px-10'>
        {courseData.map((course) => (
          <div key={course.id}>
            <h3>{course.title}</h3>
            <h3>{course.description}</h3>
          </div>
        ))}

      <button onClick={handleBuyNow}>Buy Now </button>

      </div>

    </div>
  );
};

export default fatLoss;

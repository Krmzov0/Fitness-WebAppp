import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Header from '@/components/Header';
import { ArrowLeft } from 'iconsax-react';
import { checkout } from '../../checkout';

const CourseDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [courseData, setCourseData] = useState(null);
    const [mealPlanData, setMealPlanData] = useState(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            // Fetch course and meal plan data
            if (id) {
                try {
                    // Fetch the specific course
                    const courseRef = doc(db, 'courses', id);
                    const courseSnapshot = await getDoc(courseRef);

                    if (courseSnapshot.exists()) {
                        const workoutPlanRef = collection(courseRef, 'workout_plan');
                        const workoutPlanSnapshot = await getDocs(workoutPlanRef);

                        if (!workoutPlanSnapshot.empty) {
                            const workoutPlanData = workoutPlanSnapshot.docs.map((doc) => {
                                return doc.data();
                            });

                            setCourseData({
                                name: courseSnapshot.data().name,
                                workoutPlanData: workoutPlanData,
                            });

                            // Set the selected workout name
                    
                        } else {
                            console.log('No workout_plan documents found for this course.');
                        }
                    } else {
                        console.log('Course not found.');
                    }
                } catch (error) {
                    console.log('Error fetching course data:', error);
                }
            }
        };

        const fetchMealPlanData = async () => {
            try {
                // Fetch the meal_plan collection
                const mealPlanRef = collection(db, 'courses', id, 'meal_plan');
                const mealPlanSnapshot = await getDocs(mealPlanRef);

                if (!mealPlanSnapshot.empty) {
                    const mealPlanData = mealPlanSnapshot.docs.map((doc) => {
                        return doc.data();
                    });

                    setMealPlanData(mealPlanData);
                } else {
                    console.log('No meal_plan documents found for this course.');
                }
            } catch (error) {
                console.log('Error fetching meal plan data:', error);
            }
        };

        fetchCourseData();
        fetchMealPlanData();
    }, [id]);

    if (!courseData || !mealPlanData) {
        return <div>Loading...</div>;
    }

    const handleCourseClick = () => {
        router.push(`/courses/${id}/checkout`);
    };

    const handleBuyNow = () => {
        checkout({
            lineItems: [
              {
                price: "price_1NRnzmI6xdHmUGn6RIuFNaMX",
                quantity: 1,
              },
            ],
          });
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />

            <div className="flex flex-col text-white top-32 relative px-10">
                <div className='flex items-center gap-x-6'>
                    <div className='backArrow relative trasition-all' onClick={() => router.push('/courses')}>
                        <ArrowLeft variant='Broken' className='top-[1px] relative cursor-pointer' size={32} color='#fff' />
                    </div>
                    {courseData && (
                        <div>
                            {courseData.workoutPlanData.map((workout, index) => (
                                <h1 key={index} className='text-4xl cubano'>{workout.name}</h1>
                            ))}
                        </div>
                    )}
                </div>

                <div className='flex gap-x-3 mt-10'>
                    <div>
                        {courseData && (
                            <div>
                                <h2>Workout Plan</h2>
                                {courseData.workoutPlanData.map((workout, index) => (
                                    <div key={index}>
                                        <h2>{workout.exercise}</h2>
                                        <h2>{workout.reps}</h2>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {mealPlanData && (
                        <div>
                            <h2>Meal Plan</h2>
                            {mealPlanData.map((meal, index) => (
                                <div key={index}>
                                    <h2>{meal.meal}</h2>
                                </div>
                            ))}
                        </div>
                    )}

                    <button onClick={handleBuyNow}>Buy Now</button>

                </div>
            </div>
        </div>
    );
};

export default CourseDetails;

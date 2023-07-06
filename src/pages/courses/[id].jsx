'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import Header from '@/components/Header';

const CourseDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const [courseData, setCourseData] = useState(null);
    const [mealPlanData, setMealPlanData] = useState(null);

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                // Fetch the specific course
                const courseRef = doc(db, 'courses', id);
                const courseSnapshot = await getDoc(courseRef);

                if (courseSnapshot.exists()) {
                    const workoutPlanRef = collection(courseRef, 'workout_plan');
                    const workoutPlanSnapshot = await getDocs(workoutPlanRef);

                    if (!workoutPlanSnapshot.empty) {
                        // Fetch the first workout_plan document
                        const workoutPlanDoc = workoutPlanSnapshot.docs[0];
                        const exercise = workoutPlanDoc.data().exercise;
                        setCourseData({
                            name: courseSnapshot.data().name,
                            exercise: exercise,
                        });
                    } else {
                        console.log('No workout_plan documents found for this course.');
                    }
                } else {
                    console.log('Course not found.');
                }
            } catch (error) {
                console.log('Error fetching course data:', error);
            }
        };

        const fetchMealPlanData = async () => {
            try {
                // Fetch the meal_plan collection
                const mealPlanRef = collection(db, 'courses', id, 'meal_plan');
                const mealPlanSnapshot = await getDocs(mealPlanRef);

                if (!mealPlanSnapshot.empty) {
                    // Fetch the first meal_plan document
                    const mealPlanDoc = mealPlanSnapshot.docs[0];
                    setMealPlanData(mealPlanDoc.data());
                } else {
                    console.log('No meal_plan documents found for this course.');
                }
            } catch (error) {
                console.log('Error fetching meal plan data:', error);
            }
        };

        if (id) {
            fetchCourseData();
            fetchMealPlanData();
        }
    }, [id]);

    if (!courseData || !mealPlanData) {
        return <div>Loading...</div>;
    }

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="flex gap-x-3 text-white top-40 relative px-10">
                <div>
                    <h2>Workout Plan</h2>
                    <h2>Monday</h2>
                    <h2>{courseData.exercise}</h2>
                </div>

                <div>
                    <h2>Meal Plan</h2>
                    <h2>Monday</h2>
                    <p>{mealPlanData.meal}</p>
                </div>
            </div>
        </div>
    );
};

export default CourseDetails;

import React, { useEffect, useState } from "react";
import { View, StatusBar, FlatList, Alert } from "react-native";
import styled from "styled-components";
import AddInput from "./components/AddInput";
import TodoList from "./components/TodoList";
import Empty from "./components/Empty";
import Header from "./components/Header";
import firestore, {firebase} from '@react-native-firebase/firestore';

export default function App() {
  const [data, setData] = useState([]);
 
  const submitHandler = (value, date) => {
    // console.log('value')
      firestore().collection('todotask').add({
        value: value,
        date: date.toISOString().slice(5, 18),
        key: Math.random().toString(),
      }).then(() => {
        console.log('Compelete!!')
      });
    // setData((prevTodo) => {
    //   return [
    //     {
    //       value: value,
    //       date: date.toISOString().slice(0, 10),
    //       key: Math.random().toString(),
    //     },
    //     ...prevTodo,
    //   ];
    // });
  };

//   useEffect(() => {
//     const unsubscribe = firestore()
//     .collection('todotask')
//     .onSnapshot(querySnapshot => {
//       const data = querySnapshot.docs.map(documentSnapshot => {
//         return {
//           _id: documentSnapshot.id,
//           value: '',
//           date: '',
//           ...documentSnapshot.data()
//         };
//       }); 
//       setData(data);
      
//     });
//     return () => unsubscribe();
// },[]
// );
    

  const deleteItem = (key) => {
    // console.log(key);
    // return Alert.alert(
    //    "You want to delete?",
    //    [
    //      {
    //        text: "Yes",
    //        onPress: () => {
    //          firestore().collection('todotask').doc(key).delete()
    //        }
    //      }
    //    ]
    // )
    setData((prevTodo) => {
      return prevTodo.filter((todo) => todo.key != key);
    });
  };

  const searchItem = (keyword) => {

  }

  return (
    <ComponentContainer>
      <View>
        <StatusBar barStyle="light-content" backgroundColor="midnightblue" />
      </View>
      <View>
        <FlatList
          data={data}
          ListHeaderComponent={() => <Header searchItem={searchItem} />}
          ListEmptyComponent={() => <Empty />}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TodoList item={item} deleteItem={deleteItem} />
          )}
        />
        <View>
          <AddInput submitHandler={submitHandler} />
        </View>
      </View>
    </ComponentContainer>
  );
}

const ComponentContainer = styled.View`
  background-color: #98D9A9;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
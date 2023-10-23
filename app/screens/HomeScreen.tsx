import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  ImageBackground,
  Image,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useCallback, useEffect, useState} from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {User} from '../types/user';
import {getUsers} from '../api/user';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../stores';
import {updateToken} from '../stores/slices/user';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const activeUser = useSelector((state: RootState) => state.user.activeUser);

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchUsers = useCallback(async (currentPage: number) => {
    setLoading(true);

    try {
      const response = await getUsers(currentPage);

      if (!response) {
        return;
      }

      setTotalPages(response.totalPages);
      const userData = response.users as User[];

      setUsers(prevUsers => [...prevUsers, ...userData]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const handleRefresh = () => {
    setUsers([]);
    setRefreshing(true);
    setPage(1);
    fetchUsers(1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;

    if (nextPage > totalPages) {
      return;
    }

    setLoading(true);
    setPage(nextPage);

    setTimeout(() => {
      fetchUsers(nextPage);
    }, 1000);
  };

  useEffect(() => {
    setUsers([]);
    fetchUsers(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <TouchableOpacity
        onPress={() => dispatch(updateToken(''))}
        style={styles.profile}>
        <Ionicon name="log-out-outline" size={28} color={'#ffffff'} />
      </TouchableOpacity>

      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1496150458551-140441714f2f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDR8fHxlbnwwfHx8fHw%3D&auto=userListat&fit=crop&w=800&q=60',
        }}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome, {activeUser?.first_name}!</Text>

          <Text style={styles.description}>Reconnect with your community</Text>
        </View>
      </ImageBackground>

      <View style={styles.user_list}>
        <FlatList
          data={users}
          keyExtractor={user => user.id.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={() =>
            loading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#000000" />
              </View>
            ) : null
          }
          renderItem={({item}) => (
            <View style={styles.user_item}>
              <Image style={styles.user_avatar} source={{uri: item.avatar}} />
              <View>
                <Text style={styles.user_name}>
                  {item.first_name} {item.last_name}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 8,
                    columnGap: 8,
                  }}>
                  <Ionicon name="mail-outline" size={16} color={'#3f4145'} />
                  <Text style={styles.user_email}>{item.email}</Text>
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#050b11',
  },
  profile: {
    position: 'absolute',
    top: 30,
    right: 15,
    zIndex: 100,
  },
  profile_avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
  },
  header: {
    paddingHorizontal: 25,
    paddingVertical: 50,
    gap: 20,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  title: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 24,
    textAlign: 'center',
  },
  description: {
    color: '#b9babb',
    fontWeight: '400',
    fontSize: 16,
    textAlign: 'center',
  },
  user_list: {
    flex: 1,
    paddingHorizontal: 25,
    paddingTop: 35,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -15,
  },
  user_item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 25,
    marginBottom: 25,
  },
  user_avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
  },
  user_name: {
    fontSize: 16,
    fontWeight: '600',
  },
  user_email: {
    fontWeight: '300',
    marginTop: -1.5,
    fontStyle: 'italic',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

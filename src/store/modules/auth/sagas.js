import { takeLatest, call, put, all } from 'redux-saga/effects';
import history from '../../../services/history';
import api from '../../../services/api';
import { signInSuccess } from './actions';

export function* signIn({ payload }) {
  const { email, password } = payload;
  // const headers = { 'Content-Type': 'application/json' };
  const response = yield call(api.post, 'sessions', { email, password });
  console.tron.log(email, password);
  const { token, user } = response.data;

  if (!user.provider) {
    console.tron.error('Ususario nao e prestador');
    return;
  }

  yield put(signInSuccess(token, user));
  history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);

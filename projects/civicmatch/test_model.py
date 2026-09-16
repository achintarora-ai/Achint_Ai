import unittest
import numpy as np
from train import TwoTower,recall

class ModelTests(unittest.TestCase):
    def test_gradients_match_finite_difference(self):
        rng=np.random.default_rng(7);m=TwoTower(4,rng,3)
        u=rng.normal(size=(3,4));x=rng.normal(size=(5,4));target=np.array([0,2,4])
        _,gu,gi=m.loss_grad(u,x,target)
        for w,g in [(m.wu,gu),(m.wi,gi)]:
            for index in [(0,0),(2,1),(3,2)]:
                original=w[index];eps=1e-5
                w[index]=original+eps;plus=m.loss_grad(u,x,target)[0]
                w[index]=original-eps;minus=m.loss_grad(u,x,target)[0];w[index]=original
                self.assertAlmostEqual(g[index],(plus-minus)/(2*eps),places=5)
    def test_precomputed_item_embeddings_equal_online_scoring(self):
        rng=np.random.default_rng(8);m=TwoTower(4,rng)
        u=rng.normal(size=(2,4));x=rng.normal(size=(6,4))
        cached=m.encode_item(x)
        np.testing.assert_allclose(m.encode_user(u)@cached.T,np.tanh(u@m.wu)@np.tanh(x@m.wi).T)
    def test_recall_denominator(self):
        self.assertEqual(recall(np.array([[3,2,1]]),np.array([[0,2]]),k=1),.5)
if __name__=='__main__':unittest.main()

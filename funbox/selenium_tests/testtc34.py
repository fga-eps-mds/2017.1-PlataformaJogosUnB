# -*- coding: utf-8 -*-
from selenium import selenium
import unittest, time, re

class tc34(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://10.10.10.10:3000/")
        self.selenium.start()
    
    def test_tc34(self):
        sel = self.selenium
        sel.open("/admin/game/game/add/")
        sel.click("link=Adicionar outro(a) Soundtrack")
        sel.click("link=Adicionar outro(a) Soundtrack")
        sel.click("link=Adicionar outro(a) Soundtrack")
        sel.click("link=Adicionar outro(a) Soundtrack")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()

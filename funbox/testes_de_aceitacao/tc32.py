# -*- coding: utf-8 -*-
from selenium import selenium
import unittest, time, re

class tc32(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://10.10.10.10:3000/")
        self.selenium.start()
    
    def test_tc32(self):
        sel = self.selenium
        sel.open("/admin/game/game/add/")
        sel.click("link=Adicionar outro(a) Image")
        sel.click("link=Adicionar outro(a) Image")
        sel.click("link=Adicionar outro(a) Image")
        sel.click("link=Adicionar outro(a) Image")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()

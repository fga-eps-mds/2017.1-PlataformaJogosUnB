# -*- coding: utf-8 -*-
from selenium import selenium
import unittest, time, re

class tc25(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://10.10.10.10:3000/")
        self.selenium.start()
    
    def test_tc25(self):
        sel = self.selenium
        sel.open("/admin/game/game/add/")
        sel.click("link=Adicionar outro(a) Package")
        sel.click("link=Adicionar outro(a) Package")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()

# -*- coding: utf-8 -*-
from selenium import selenium
import unittest, time, re

class tc51(unittest.TestCase):
    def setUp(self):
        self.verificationErrors = []
        self.selenium = selenium("localhost", 4444, "*chrome", "http://10.10.10.10:3000/")
        self.selenium.start()
    
    def test_tc51(self):
        sel = self.selenium
        sel.open("/admin/auth/user/")
        sel.click(u"link=Adicionar usuário")
        sel.click(u"link=Adicionar usuário")
        sel.wait_for_page_to_load("30000")
    
    def tearDown(self):
        self.selenium.stop()
        self.assertEqual([], self.verificationErrors)

if __name__ == "__main__":
    unittest.main()
